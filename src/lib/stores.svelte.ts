import type { QuizResult, WordStats } from './types';

class ScoreStore {
	results = $state<QuizResult[]>([]);

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('korea-quiz-results');
			if (saved) this.results = JSON.parse(saved);
		}
	}

	add(result: QuizResult) {
		this.results = [result, ...this.results];
		if (typeof window !== 'undefined') {
			localStorage.setItem('korea-quiz-results', JSON.stringify(this.results));
		}
	}

	clear() {
		this.results = [];
		if (typeof window !== 'undefined') {
			localStorage.removeItem('korea-quiz-results');
		}
	}

	get totalCorrect() {
		return this.results.reduce((sum, r) => sum + r.correct, 0);
	}

	get totalWrong() {
		return this.results.reduce((sum, r) => sum + r.wrong, 0);
	}

	get totalQuizzes() {
		return this.results.length;
	}

	get accuracy() {
		const total = this.totalCorrect + this.totalWrong;
		return total === 0 ? 0 : Math.round((this.totalCorrect / total) * 100);
	}
}

export const scoreStore = new ScoreStore();

const WORD_STATS_KEY = 'korea-word-stats';

class WordStatsStore {
	stats = $state<Record<number, WordStats>>({});

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem(WORD_STATS_KEY);
			if (saved) this.stats = JSON.parse(saved);
		}
	}

	get(wordId: number): WordStats {
		return this.stats[wordId] ?? { wordId, correct: 0, wrong: 0, lastSeen: null };
	}

	record(wordId: number, wasCorrect: boolean) {
		const prev = this.get(wordId);
		this.stats[wordId] = {
			wordId,
			correct: prev.correct + (wasCorrect ? 1 : 0),
			wrong: prev.wrong + (wasCorrect ? 0 : 1),
			lastSeen: new Date().toISOString()
		};
		if (typeof window !== 'undefined') {
			localStorage.setItem(WORD_STATS_KEY, JSON.stringify(this.stats));
		}
	}

	clear() {
		this.stats = {};
		if (typeof window !== 'undefined') {
			localStorage.removeItem(WORD_STATS_KEY);
		}
	}
}

export const wordStatsStore = new WordStatsStore();
