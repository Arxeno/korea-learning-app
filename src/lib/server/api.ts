import { error } from '@sveltejs/kit';

/**
 * Reads a JSON request body. Requiring `application/json` also protects these cookie-authenticated
 * endpoints from cross-site requests: browsers send it cross-origin only after a CORS preflight,
 * which this app never allows.
 */
export async function readJson(request: Request): Promise<unknown> {
	if (!request.headers.get('content-type')?.startsWith('application/json')) {
		error(415, 'Expected application/json');
	}
	try {
		return await request.json();
	} catch {
		error(400, 'Invalid JSON');
	}
}

export function requireUser(locals: App.Locals) {
	if (!locals.user) error(401, 'Not signed in');
	return locals.user;
}
