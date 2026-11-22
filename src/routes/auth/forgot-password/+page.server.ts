import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { field, isValidEmail } from '$lib/server/auth-utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = field(data, 'email').toLowerCase();

		if (!isValidEmail(email)) {
			return fail(400, { email, message: 'Format email tidak valid.' });
		}

		try {
			// Emails a link to /api/auth/reset-password/<token>, which redirects to
			// /auth/reset-password?token=<token> (or ?error=INVALID_TOKEN).
			await auth.api.requestPasswordReset({
				body: { email, redirectTo: '/auth/reset-password' },
				headers: request.headers
			});
		} catch (error) {
			// Don't reveal failures to the user; the response is the same either way.
			console.error('[auth] Password reset request failed:', error);
		}

		// Same response whether or not the email is registered, so accounts can't be enumerated.
		return { sent: true, email };
	}
};
