import { fail, redirect } from '@sveltejs/kit';
import { isAPIError } from 'better-auth/api';
import { auth } from '$lib/server/auth';
import { authErrorMessage, passwordField, validateNewPassword } from '$lib/server/auth-utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	// Better Auth redirects here with ?token=… for a valid link, or ?error=INVALID_TOKEN.
	const token = url.searchParams.get('token');
	const invalid = !token || url.searchParams.has('error');

	return { token: invalid ? null : token };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const token = passwordField(data, 'token');
		const password = passwordField(data, 'password');
		const confirmPassword = passwordField(data, 'confirmPassword');

		if (!token) return fail(400, { invalidToken: true, message: null });

		const passwordError = validateNewPassword(password, confirmPassword);
		if (passwordError) return fail(400, { invalidToken: false, message: passwordError });

		try {
			await auth.api.resetPassword({ body: { newPassword: password, token } });
		} catch (error) {
			const invalidToken = isAPIError(error) && error.body?.code === 'INVALID_TOKEN';
			return fail(400, { invalidToken, message: invalidToken ? null : authErrorMessage(error) });
		}

		redirect(303, '/auth/sign-in?reset=success');
	}
};
