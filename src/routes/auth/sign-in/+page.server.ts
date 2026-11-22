import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { authErrorMessage, field, passwordField, safeRedirect } from '$lib/server/auth-utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, url }) => {
	const redirectTo = safeRedirect(url.searchParams.get('redirectTo'));
	if (locals.user) redirect(303, redirectTo);

	return {
		redirectTo,
		resetSuccess: url.searchParams.get('reset') === 'success'
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = field(data, 'email').toLowerCase();
		const password = passwordField(data, 'password');
		const redirectTo = safeRedirect(data.get('redirectTo'));

		if (!email || !password) {
			return fail(400, { email, message: 'Email dan kata sandi wajib diisi.' });
		}

		try {
			await auth.api.signInEmail({ body: { email, password }, headers: request.headers });
		} catch (error) {
			return fail(400, { email, message: authErrorMessage(error) });
		}

		redirect(303, redirectTo);
	}
};
