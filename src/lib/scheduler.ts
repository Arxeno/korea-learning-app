import type { Word, WordStats } from './types';

// Anki-inspired priority: failed cards resurface sooner.
// ponytail: wrong-count only, no ease/intervals/due-dates.
// Upgrade to SM-2-lite (ease factor + interval per word) if
// wrong-count proves too coarse once review history grows.

const UNSEEN_WEIGHT = 3.0;
const MIN_WEIGHT = 0.5;

export function weight(stats: WordStats): number {
	if (stats.lastSeen === null) return UNSEEN_WEIGHT;
	return Math.max(MIN_WEIGHT, 1 + stats.wrong * 2 - stats.correct * 0.5);
}

export function selectQuizWords(
	words: Word[],
	getStats: (wordId: number) => WordStats,
	n: number
): Word[] {
	const ranked = [...words].sort((a, b) => weight(getStats(b.id)) - weight(getStats(a.id)));
	const pool = ranked.slice(0, Math.min(ranked.length, n * 2));
	const picked: Word[] = [];
	const remaining = [...pool];
	const count = Math.min(n, remaining.length);
	for (let i = 0; i < count; i++) {
		const total = remaining.reduce((sum, w) => sum + weight(getStats(w.id)), 0);
		let r = Math.random() * total;
		let idx = 0;
		for (; idx < remaining.length; idx++) {
			r -= weight(getStats(remaining[idx].id));
			if (r <= 0) break;
		}
		picked.push(remaining.splice(Math.min(idx, remaining.length - 1), 1)[0]);
	}
	return picked;
}
