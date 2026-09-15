import type { QuizResult } from './types';

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
