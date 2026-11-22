import type { Handle } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = null;
	event.locals.session = null;

	if (!building) {
		const result = await auth.api.getSession({ headers: event.request.headers });
		if (result) {
			event.locals.user = result.user;
			event.locals.session = result.session;
		}
	}

	// Serves Better Auth's own endpoints under /api/auth/* (e.g. the reset link redirect).
	return svelteKitHandler({ event, resolve, auth, building });
};
