import { getProgress } from '$lib/server/progress';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// Only send what the UI needs to the client.
	return {
		user: locals.user ? { name: locals.user.name, email: locals.user.email } : null,
		// Signed-in users' quiz progress; guests keep theirs in localStorage.
		progress: locals.user ? await getProgress(locals.user.id) : null
	};
};
