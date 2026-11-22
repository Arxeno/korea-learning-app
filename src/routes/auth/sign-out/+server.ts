import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import type { RequestHandler } from './$types';

// POST-only (GET returns 405), so links or prefetching can't sign the user out.
export const POST: RequestHandler = async ({ request, locals }) => {
	if (locals.session) {
		// Deletes the session row and clears the cookie (via the sveltekitCookies plugin).
		await auth.api.signOut({ headers: request.headers });
	}
	redirect(303, '/');
};
