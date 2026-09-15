export interface Word {
	id: number;
	hangeul: string;
	idMean: string;
	category: 'kata sifat' | 'kata kerja' | 'kata benda';
}

export interface QuizResult {
	date: string;
	total: number;
	correct: number;
	wrong: number;
}
