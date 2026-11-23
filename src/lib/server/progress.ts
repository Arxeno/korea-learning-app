// Quiz progress of signed-in users: reads, writes, and the one-time import of guest progress
// (localStorage) when a guest creates an account. Everything sent by the browser is validated here.
import { desc, eq, sql } from 'drizzle-orm';
import { words } from '$lib/vocab';
import type { QuizResult, WordStats } from '$lib/types';
import { db } from './db';
import { quizResult, wordStat } from './db/schema';

export interface Progress {
	results: QuizResult[];
	stats: Record<number, WordStats>;
}

/** Upper bounds that real usage never reaches; anything above is not from this app. */
const MAX_QUIZ_RESULTS = 2000;
const MAX_QUESTIONS = 1000;
const MAX_COUNT = 1_000_000;
/** Dates from before the app existed, or more than a day ahead (clock skew), are rejected. */
const EARLIEST = Date.UTC(2024, 0, 1);
const CLOCK_SKEW_MS = 24 * 60 * 60 * 1000;

const wordIds = new Set(words.map((w) => w.id));

export async function getProgress(userId: string): Promise<Progress> {
	const [quizRows, statRows] = await Promise.all([
		db
			.select()
			.from(quizResult)
			.where(eq(quizResult.userId, userId))
			.orderBy(desc(quizResult.takenAt))
			.limit(MAX_QUIZ_RESULTS),
		db.select().from(wordStat).where(eq(wordStat.userId, userId))
	]);

	const stats: Record<number, WordStats> = {};
	for (const row of statRows) {
		stats[row.wordId] = {
			wordId: row.wordId,
			correct: row.correct,
			wrong: row.wrong,
			lastSeen: row.lastSeen?.toISOString() ?? null
		};
	}

	return {
		results: quizRows.map((row) => ({
			date: row.takenAt.toISOString(),
			total: row.total,
			correct: row.correct,
			wrong: row.wrong
		})),
		stats
	};
}

export async function addQuizResult(userId: string, result: QuizResult) {
	await db
		.insert(quizResult)
		.values(toQuizRow(userId, result))
		.onConflictDoNothing({ target: [quizResult.userId, quizResult.takenAt] });
}

export async function recordWord(userId: string, wordId: number, wasCorrect: boolean) {
	await upsertWordStats([
		{
			userId,
			wordId,
			correct: wasCorrect ? 1 : 0,
			wrong: wasCorrect ? 0 : 1,
			lastSeen: new Date()
		}
	]);
}

/** Adds guest progress to an account in one transaction. Re-running it does not duplicate quizzes. */
export async function importGuestProgress(userId: string, progress: Progress) {
	const quizRows = progress.results.map((r) => toQuizRow(userId, r));
	const statRows = Object.values(progress.stats).map((s) => ({
		userId,
		wordId: s.wordId,
		correct: s.correct,
		wrong: s.wrong,
		lastSeen: s.lastSeen ? new Date(s.lastSeen) : null
	}));

	await db.transaction(async (tx) => {
		if (quizRows.length > 0) {
			await tx
				.insert(quizResult)
				.values(quizRows)
				.onConflictDoNothing({ target: [quizResult.userId, quizResult.takenAt] });
		}
		if (statRows.length > 0) await upsertWordStats(statRows, tx);
	});
}

type WordStatRow = typeof wordStat.$inferInsert;
type Executor = Pick<typeof db, 'insert'>;

/** Adds the counts to any existing row for the same word and keeps the latest lastSeen. */
async function upsertWordStats(rows: WordStatRow[], executor: Executor = db) {
	await executor
		.insert(wordStat)
		.values(rows)
		.onConflictDoUpdate({
			target: [wordStat.userId, wordStat.wordId],
			set: {
				correct: sql.raw('"word_stat"."correct" + excluded."correct"'),
				wrong: sql.raw('"word_stat"."wrong" + excluded."wrong"'),
				lastSeen: sql.raw('greatest("word_stat"."last_seen", excluded."last_seen")')
			}
		});
}

function toQuizRow(userId: string, result: QuizResult) {
	return {
		userId,
		takenAt: new Date(result.date),
		total: result.total,
		correct: result.correct,
		wrong: result.wrong
	};
}

// --- Validation of browser input -------------------------------------------------------------

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isCount(value: unknown, max = MAX_COUNT): value is number {
	return Number.isInteger(value) && (value as number) >= 0 && (value as number) <= max;
}

/** Returns the ISO string of a plausible timestamp, or null. */
function parseDate(value: unknown): string | null {
	if (typeof value !== 'string') return null;
	const time = Date.parse(value);
	if (Number.isNaN(time) || time < EARLIEST || time > Date.now() + CLOCK_SKEW_MS) return null;
	return new Date(time).toISOString();
}

export function parseQuizResult(value: unknown): QuizResult | null {
	if (!isRecord(value)) return null;
	const date = parseDate(value.date);
	const { total, correct, wrong } = value;
	if (!date || !isCount(total, MAX_QUESTIONS) || total === 0) return null;
	if (!isCount(correct) || !isCount(wrong) || correct + wrong !== total) return null;
	return { date, total, correct, wrong };
}

export function parseWordAnswer(value: unknown): { wordId: number; correct: boolean } | null {
	if (!isRecord(value)) return null;
	const { wordId, correct } = value;
	if (typeof wordId !== 'number' || !wordIds.has(wordId) || typeof correct !== 'boolean') {
		return null;
	}
	return { wordId, correct };
}

function parseWordStats(value: unknown): WordStats | null {
	if (!isRecord(value)) return null;
	const { wordId, correct, wrong } = value;
	if (typeof wordId !== 'number' || !wordIds.has(wordId)) return null;
	if (!isCount(correct) || !isCount(wrong) || correct + wrong === 0) return null;
	return { wordId, correct, wrong, lastSeen: parseDate(value.lastSeen) };
}

/**
 * Parses the guest progress a sign-up form sends (the two localStorage values).
 * Invalid entries are dropped rather than failing the whole import.
 */
export function parseGuestProgress(json: string): Progress | null {
	let value: unknown;
	try {
		value = JSON.parse(json);
	} catch {
		return null;
	}
	if (!isRecord(value)) return null;

	const results = new Map<string, QuizResult>();
	if (Array.isArray(value.results)) {
		for (const item of value.results) {
			const result = parseQuizResult(item);
			if (result) results.set(result.date, result);
		}
	}

	const stats: Record<number, WordStats> = {};
	if (isRecord(value.stats)) {
		for (const item of Object.values(value.stats)) {
			const stat = parseWordStats(item);
			if (stat) stats[stat.wordId] = stat;
		}
	}

	return {
		results: [...results.values()]
			.sort((a, b) => b.date.localeCompare(a.date))
			.slice(0, MAX_QUIZ_RESULTS),
		stats
	};
}
