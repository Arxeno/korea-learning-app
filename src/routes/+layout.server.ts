import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	// Only send what the UI needs to the client.
	return {
		user: locals.user ? { name: locals.user.name, email: locals.user.email } : null
	};
};
