import type { QuizResult, WordStats } from './types';

// Progress lives in one of two places:
// - guest:   localStorage of this browser (the keys below)
// - account: the database, through /api/progress/* (the page data seeds it, see routes/+layout.ts)
// The stores are module singletons, so they are only ever filled in the browser, never during SSR.

type Mode = 'guest' | 'account';

const RESULTS_KEY = 'korea-quiz-results';
const WORD_STATS_KEY = 'korea-word-stats';

function readJson<T>(key: string, fallback: T): T {
	try {
		const saved = localStorage.getItem(key);
		return saved ? (JSON.parse(saved) as T) : fallback;
	} catch {
		return fallback;
	}
}

function writeJson(key: string, value: unknown) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Storage full or blocked: the progress stays in memory for this visit.
	}
}

/** Set when saving to the account fails; the layout shows a notice. */
export const syncStatus = $state({ failed: false });

async function postJson(url: string, body: unknown) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(body),
			// Lets the last answer of a quiz finish saving even if the user navigates away.
			keepalive: true
		});
		if (!response.ok) throw new Error(`${url} responded ${response.status}`);
	} catch (error) {
		console.error('[progress]', error);
		syncStatus.failed = true;
	}
}

class ScoreStore {
	results = $state<QuizResult[]>([]);
	#mode: Mode = 'guest';

	useGuest() {
		this.#mode = 'guest';
		this.results = readJson<QuizResult[]>(RESULTS_KEY, []);
	}

	useAccount(results: QuizResult[]) {
		this.#mode = 'account';
		this.results = results;
	}

	add(result: QuizResult) {
		this.results = [result, ...this.results];
		if (this.#mode === 'account') {
			void postJson('/api/progress/quiz', result);
		} else {
			writeJson(RESULTS_KEY, this.results);
		}
	}

	get totalCorrect() {
		return this.results.reduce((sum, r) => sum + r.correct, 0);
	}

	get totalWrong() {
		return this.results.reduce((sum, r) => sum + r.wrong, 0);
	}

	get totalQuizzes() {
		return this.results.length;
	}

	get accuracy() {
		const total = this.totalCorrect + this.totalWrong;
		return total === 0 ? 0 : Math.round((this.totalCorrect / total) * 100);
	}
}

export const scoreStore = new ScoreStore();

class WordStatsStore {
	stats = $state<Record<number, WordStats>>({});
	#mode: Mode = 'guest';

	useGuest() {
		this.#mode = 'guest';
		this.stats = readJson<Record<number, WordStats>>(WORD_STATS_KEY, {});
	}

	useAccount(stats: Record<number, WordStats>) {
		this.#mode = 'account';
		this.stats = stats;
	}

	get(wordId: number): WordStats {
		return this.stats[wordId] ?? { wordId, correct: 0, wrong: 0, lastSeen: null };
	}

	/** Number of words answered at least once. */
	get practicedCount() {
		return Object.keys(this.stats).length;
	}

	record(wordId: number, wasCorrect: boolean) {
		const prev = this.get(wordId);
		this.stats[wordId] = {
			wordId,
			correct: prev.correct + (wasCorrect ? 1 : 0),
			wrong: prev.wrong + (wasCorrect ? 0 : 1),
			lastSeen: new Date().toISOString()
		};
		if (this.#mode === 'account') {
			void postJson('/api/progress/word', { wordId, correct: wasCorrect });
		} else {
			writeJson(WORD_STATS_KEY, this.stats);
		}
	}
}

export const wordStatsStore = new WordStatsStore();

/** Points both stores at the account's progress (signed in) or this browser's (guest). */
export function useProgress(
	progress: { results: QuizResult[]; stats: Record<number, WordStats> } | null
) {
	syncStatus.failed = false;
	if (progress) {
		scoreStore.useAccount(progress.results);
		wordStatsStore.useAccount(progress.stats);
	} else {
		scoreStore.useGuest();
		wordStatsStore.useGuest();
	}
}

export interface GuestProgress {
	results: QuizResult[];
	stats: Record<number, WordStats>;
	quizCount: number;
	wordCount: number;
}

/** The progress saved in this browser without an account, or null if there is none. */
export function readGuestProgress(): GuestProgress | null {
	const results = readJson<QuizResult[]>(RESULTS_KEY, []);
	const stats = readJson<Record<number, WordStats>>(WORD_STATS_KEY, {});
	const quizCount = Array.isArray(results) ? results.length : 0;
	const wordCount = Object.keys(stats ?? {}).length;
	if (quizCount === 0 && wordCount === 0) return null;
	return { results, stats, quizCount, wordCount };
}

/** Removes the guest progress from this browser (after moving it to an account, or on sign-out). */
export function clearGuestProgress() {
	try {
		localStorage.removeItem(RESULTS_KEY);
		localStorage.removeItem(WORD_STATS_KEY);
	} catch {
		// Storage blocked: nothing was saved there either.
	}
}
