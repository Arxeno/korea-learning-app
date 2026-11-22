import type { Word } from '$lib/types';
import umum from './umum.json';
import lesson04 from './lesson-04.json';
import lesson05 from './lesson-05.json';

// Each lesson file owns the id range lesson * 1000 + n, so ids never collide
// and existing word stats (keyed by id in localStorage) stay valid.
export const words: Word[] = [
	...(umum as Word[]),
	...(lesson04 as Word[]),
	...(lesson05 as Word[])
];

/** Filter key for a word's lesson: the lesson number, or 'umum' for words without one. */
export type LessonKey = number | 'umum';

export function lessonKey(word: Word): LessonKey {
	return word.lesson ?? 'umum';
}

export function lessonLabel(key: LessonKey): string {
	return key === 'umum' ? 'Umum' : `Pelajaran ${key}`;
}

/** Distinct lesson keys in display order: Umum first, then lessons ascending. */
export function lessonsIn(list: Word[]): LessonKey[] {
	const keys = new Set(list.map(lessonKey));
	const lessons = [...keys].filter((k): k is number => k !== 'umum').sort((a, b) => a - b);
	return keys.has('umum') ? ['umum', ...lessons] : lessons;
}
