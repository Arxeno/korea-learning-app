// Weekly leaderboard: signed-in users ranked by the number of quizzes they finished this week.
// Weeks run Monday 00:00 to Monday 00:00 in Jakarta time (WIB), the same zone the home page uses.
import { and, asc, eq, gte, lt, lte, or, sql } from 'drizzle-orm';
import type { Leaderboard, LeaderboardEntry } from '$lib/types';
import { db } from './db';
import { quizResult, user } from './db/schema';

/** How many places the board shows. The signed-in user's own place is always included. */
export const LEADERBOARD_SIZE = 50;

/** WIB is UTC+7 all year (no daylight saving time). */
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** The current week: from Monday 00:00 WIB up to (not including) the next Monday 00:00 WIB. */
export function currentWeek(now = new Date()) {
	// Shifted so that the UTC getters read the wall clock in Jakarta.
	const wib = new Date(now.getTime() + WIB_OFFSET_MS);
	const daysSinceMonday = (wib.getUTCDay() + 6) % 7;
	const mondayWib = Date.UTC(wib.getUTCFullYear(), wib.getUTCMonth(), wib.getUTCDate());
	const start = new Date(mondayWib - daysSinceMonday * DAY_MS - WIB_OFFSET_MS);
	return { start, end: new Date(start.getTime() + 7 * DAY_MS) };
}

export async function getWeeklyLeaderboard(userId: string | null): Promise<Leaderboard> {
	const { start, end } = currentWeek();

	// Ties on quiz count go to more correct answers; users equal on both share a rank.
	const ranked = db.$with('ranked').as(
		db
			.select({
				userId: quizResult.userId,
				name: user.name,
				quizzes: sql<number>`count(*)::int`.as('quizzes'),
				correct: sql<number>`sum(${quizResult.correct})::int`.as('correct'),
				answered: sql<number>`sum(${quizResult.total})::int`.as('answered'),
				rank: sql<number>`(rank() over (order by count(*) desc, sum(${quizResult.correct}) desc))::int`.as(
					'rank'
				)
			})
			.from(quizResult)
			.innerJoin(user, eq(user.id, quizResult.userId))
			.where(and(gte(quizResult.takenAt, start), lt(quizResult.takenAt, end)))
			.groupBy(quizResult.userId, user.name)
	);

	const inTop = lte(ranked.rank, LEADERBOARD_SIZE);
	const rows = await db
		.with(ranked)
		.select()
		.from(ranked)
		.where(userId ? or(inTop, eq(ranked.userId, userId)) : inTop)
		.orderBy(asc(ranked.rank), asc(ranked.name));

	// Only what the page shows leaves the server: no user ids or emails.
	const entries = rows.map<LeaderboardEntry>((row) => ({
		rank: row.rank,
		name: row.name,
		quizzes: row.quizzes,
		correct: row.correct,
		accuracy: row.answered === 0 ? 0 : Math.round((row.correct / row.answered) * 100),
		isMe: row.userId === userId
	}));

	return {
		weekStart: start.toISOString(),
		weekEnd: end.toISOString(),
		entries: entries.filter((entry) => entry.rank <= LEADERBOARD_SIZE),
		me: entries.find((entry) => entry.isMe) ?? null
	};
}
