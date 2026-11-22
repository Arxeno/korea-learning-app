export type Category =
	| 'kata sifat'
	| 'kata kerja'
	| 'kata benda'
	| 'kata bilangan'
	| 'kata keterangan'
	| 'kata tanya'
	| 'kata sambung'
	| 'kata satuan';

export interface Word {
	id: number;
	hangeul: string;
	phonetic: string;
	idMean: string;
	category: Category;
	/** Textbook lesson (Pelajaran) number; undefined = "Umum". */
	lesson?: number;
	/** Group inside a lesson, e.g. "Nama Hari", "Kosakata Baru". */
	topic?: string;
}

export interface QuizResult {
	date: string;
	total: number;
	correct: number;
	wrong: number;
}

export interface WordStats {
	wordId: number;
	correct: number;
	wrong: number;
	lastSeen: string | null;
}

export interface RevealItem {
	kind: 'reveal';
	prompt: string;
	answer: string;
	hint?: string;
}

export interface TrueFalseItem {
	kind: 'truefalse';
	statement: string;
	answer: boolean;
	explanation: string;
}

export interface ChoiceItem {
	kind: 'choice';
	prompt: string;
	options: string[];
	correct: number;
	hint?: string;
}

export type ExerciseItem = RevealItem | TrueFalseItem | ChoiceItem;

export interface ExerciseSet {
	id: string;
	page: number;
	title: string;
	instruction: string;
	/** Passage, memo or table rows shown above the items. */
	context?: string[];
	items: ExerciseItem[];
}

export interface LessonExercises {
	lesson: number;
	title: string;
	titleId: string;
	sets: ExerciseSet[];
}
