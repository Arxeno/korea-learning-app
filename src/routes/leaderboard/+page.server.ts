import { getWeeklyLeaderboard } from '$lib/server/leaderboard';
import type { PageServerLoad } from './$types';

// Public page: guests see the board too, with an invite to create an account.
export const load: PageServerLoad = async ({ locals }) => {
	return { leaderboard: await getWeeklyLeaderboard(locals.user?.id ?? null) };
};
