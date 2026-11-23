import { error } from '@sveltejs/kit';
import { readJson, requireUser } from '$lib/server/api';
import { addQuizResult, parseQuizResult } from '$lib/server/progress';
import type { RequestHandler } from './$types';

/** Saves one finished quiz for the signed-in user. */
export const POST: RequestHandler = async ({ request, locals }) => {
	const user = requireUser(locals);
	const result = parseQuizResult(await readJson(request));
	if (!result) error(400, 'Invalid quiz result');

	await addQuizResult(user.id, result);
	return new Response(null, { status: 204 });
};
