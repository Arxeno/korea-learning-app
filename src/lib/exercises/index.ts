import type { LessonExercises } from '$lib/types';
import { lesson04 } from './lesson-04';
import { lesson05 } from './lesson-05';

export const lessonExercises: LessonExercises[] = [lesson04, lesson05];

export function getLessonExercises(lesson: number): LessonExercises | undefined {
	return lessonExercises.find((l) => l.lesson === lesson);
}
