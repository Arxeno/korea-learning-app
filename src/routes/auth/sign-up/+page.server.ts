import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import {
	authErrorMessage,
	field,
	isValidEmail,
	passwordField,
	safeRedirect,
	validateNewPassword
} from '$lib/server/auth-utils';
import { importGuestProgress, parseGuestProgress } from '$lib/server/progress';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, url }) => {
	const redirectTo = safeRedirect(url.searchParams.get('redirectTo'));
	if (locals.user) redirect(303, redirectTo);

	return { redirectTo };
};

export const actions: Actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();
		const name = field(data, 'name');
		const email = field(data, 'email').toLowerCase();
		const password = passwordField(data, 'password');
		const confirmPassword = passwordField(data, 'confirmPassword');
		const redirectTo = safeRedirect(data.get('redirectTo'));

		const values = { name, email };

		if (!name) return fail(400, { ...values, message: 'Nama wajib diisi.' });
		if (!isValidEmail(email)) return fail(400, { ...values, message: 'Format email tidak valid.' });

		const passwordError = validateNewPassword(password, confirmPassword);
		if (passwordError) return fail(400, { ...values, message: passwordError });

		let userId: string;
		try {
			// Signs the new user in automatically (session cookie set via the sveltekitCookies plugin).
			const result = await auth.api.signUpEmail({
				body: { name, email, password },
				headers: request.headers
			});
			userId = result.user.id;
		} catch (error) {
			return fail(400, { ...values, message: authErrorMessage(error) });
		}

		// Optional: move the progress made as a guest into the new account. A failure here must not
		// undo the sign-up; the progress then simply stays in the browser.
		if (data.get('importProgress')) {
			const destination = new URL(redirectTo, url);
			try {
				const progress = parseGuestProgress(field(data, 'guestProgress'));
				if (!progress) throw new Error('Unreadable guest progress');
				await importGuestProgress(userId, progress);
				destination.searchParams.set('progress', 'saved');
			} catch (error) {
				console.error('[progress] import failed', error);
				destination.searchParams.set('progress', 'failed');
			}
			redirect(303, destination.pathname + destination.search);
		}

		redirect(303, redirectTo);
	}
};
