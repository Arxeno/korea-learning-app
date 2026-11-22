import { error } from '@sveltejs/kit';
import { getLessonExercises } from '$lib/exercises';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const exercises = getLessonExercises(Number(params.lesson));
	if (!exercises) error(404, 'Pelajaran tidak ditemukan');
	return { exercises };
};
