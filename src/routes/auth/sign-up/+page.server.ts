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
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, url }) => {
	const redirectTo = safeRedirect(url.searchParams.get('redirectTo'));
	if (locals.user) redirect(303, redirectTo);

	return { redirectTo };
};

export const actions: Actions = {
	default: async ({ request }) => {
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

		try {
			// Signs the new user in automatically (session cookie set via the sveltekitCookies plugin).
			await auth.api.signUpEmail({ body: { name, email, password }, headers: request.headers });
		} catch (error) {
			return fail(400, { ...values, message: authErrorMessage(error) });
		}

		redirect(303, redirectTo);
	}
};
