import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.user) redirect(303, '/auth/sign-in?redirectTo=/account');

	return {
		account: {
			name: locals.user.name,
			email: locals.user.email,
			createdAt: locals.user.createdAt.toISOString()
		}
	};
};
