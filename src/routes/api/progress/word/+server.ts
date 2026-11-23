import { error } from '@sveltejs/kit';
import { readJson, requireUser } from '$lib/server/api';
import { parseWordAnswer, recordWord } from '$lib/server/progress';
import type { RequestHandler } from './$types';

/** Records one answer to a word for the signed-in user. */
export const POST: RequestHandler = async ({ request, locals }) => {
	const user = requireUser(locals);
	const answer = parseWordAnswer(await readJson(request));
	if (!answer) error(400, 'Invalid answer');

	await recordWord(user.id, answer.wordId, answer.correct);
	return new Response(null, { status: 204 });
};
