<script lang="ts">
	import { words, lessonKey, lessonLabel, lessonsIn, type LessonKey } from '$lib/vocab';
	import type { Word, QuizResult } from '$lib/types';
	import FilterChips from '$lib/components/FilterChips.svelte';
	import { scoreStore, wordStatsStore } from '$lib/stores.svelte';
	import { selectQuizWords } from '$lib/scheduler';
	import { resolve } from '$app/paths';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import QuizProgress from '$lib/components/QuizProgress.svelte';
	import AnswerOption, { answerState } from '$lib/components/AnswerOption.svelte';
	import ResultSummary from '$lib/components/ResultSummary.svelte';
	import { revealActions } from '$lib/reveal';

	const TOTAL_QUESTIONS = 20;

	const lessonOptions = lessonsIn(words).map((key) => ({ value: key, label: lessonLabel(key) }));
	let activeLesson = $state<LessonKey | null>(null);

	let currentIndex = $state(0);
	let score = $state(0);
	let answered = $state(false);
	let selectedAnswer = $state('');
	let correctAnswer = $state('');
	let options = $state<string[]>([]);
	let finished = $state(false);
	let quizWords = $state<Word[]>([]);
	let actions = $state<HTMLElement>();

	function shuffle<T>(arr: T[]): T[] {
		const a = [...arr];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	// Wrong choices come from the closest group first (same lesson + category,
	// then same lesson, then everything) so 월요일 is tested against other days.
	// Words sharing the meaning or the spelling (일 = satu / tanggal) are never offered.
	function generateOptions(word: Word): string[] {
		const usable = words.filter((w) => w.idMean !== word.idMean && w.hangeul !== word.hangeul);
		const tiers = [
			usable.filter((w) => w.lesson === word.lesson && w.category === word.category),
			usable.filter((w) => w.lesson === word.lesson),
			usable
		];
		const picked: string[] = [];
		for (const tier of tiers) {
			for (const w of shuffle(tier)) {
				if (picked.length >= 3) break;
				if (!picked.includes(w.idMean)) picked.push(w.idMean);
			}
		}
		return shuffle([word.idMean, ...picked]);
	}

	function startQuiz() {
		const pool = activeLesson === null ? words : words.filter((w) => lessonKey(w) === activeLesson);
		quizWords = selectQuizWords(pool, (id) => wordStatsStore.get(id), TOTAL_QUESTIONS);
		currentIndex = 0;
		score = 0;
		finished = false;
		loadQuestion();
	}

	function loadQuestion() {
		answered = false;
		selectedAnswer = '';
		const word = quizWords[currentIndex];
		correctAnswer = word.idMean;
		options = generateOptions(word);
	}

	function selectAnswer(answer: string) {
		if (answered) return;
		answered = true;
		selectedAnswer = answer;
		const isCorrect = answer === correctAnswer;
		if (isCorrect) {
			score++;
		}
		wordStatsStore.record(quizWords[currentIndex].id, isCorrect);
		void revealActions(() => actions);
	}

	function nextQuestion() {
		if (currentIndex + 1 >= quizWords.length) {
			finished = true;
			const result: QuizResult = {
				date: new Date().toISOString(),
				total: quizWords.length,
				correct: score,
				wrong: quizWords.length - score
			};
			scoreStore.add(result);
		} else {
			currentIndex++;
			loadQuestion();
		}
	}

	startQuiz();
</script>

<svelte:head>
	<title>Kuis - Hangul Learning</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-xl flex-col gap-6">
	<PageHeader eyebrow="퀴즈" title="Kuis" size="md" />

	<div class="flex flex-col gap-2">
		<p class="eyebrow">Pilih pelajaran</p>
		<FilterChips
			options={lessonOptions}
			bind:value={activeLesson}
			allLabel="Semua"
			onchange={startQuiz}
		/>
	</div>

	{#if !finished}
		{@const word = quizWords[currentIndex]}
		<QuizProgress current={currentIndex + 1} total={quizWords.length} {score} />

		<div class="card px-6 py-10 text-center sm:py-12">
			<p class="eyebrow">Apa artinya?</p>
			<p lang="ko" class="mt-4 font-serif text-5xl font-bold text-ink sm:text-6xl">
				{word.hangeul}
			</p>
			<p class="mt-3 text-ink-muted italic">{word.phonetic}</p>
		</div>

		<div class="flex flex-col gap-3">
			{#each options as option, i (option)}
				<AnswerOption
					label={option}
					index={i}
					state={answerState(option, answered ? selectedAnswer : null, correctAnswer)}
					onclick={() => selectAnswer(option)}
				/>
			{/each}
		</div>

		{#if answered}
			{@const correct = selectedAnswer === correctAnswer}
			<div
				bind:this={actions}
				class="flex scroll-mb-28 flex-col gap-3 sm:flex-row sm:items-center md:scroll-mb-8"
			>
				<p
					role="status"
					class="flex-1 rounded-xl px-4 py-3 text-sm font-medium {correct
						? 'bg-jade-50 text-jade-700'
						: 'bg-coral-50 text-coral-700'}"
				>
					{#if correct}
						Benar! <span lang="ko">잘했어요</span> 🎉
					{:else}
						Jawaban yang benar: <strong>{correctAnswer}</strong>
					{/if}
				</p>
				<button type="button" class="btn btn-primary" onclick={nextQuestion}>
					{currentIndex + 1 >= quizWords.length ? 'Lihat Hasil' : 'Berikutnya'}
					<ArrowRightOutline class="h-5 w-5" />
				</button>
			</div>
		{/if}
	{:else}
		<ResultSummary
			title="Kuis Selesai!"
			correct={score}
			total={quizWords.length}
			onrestart={startQuiz}
			secondary={{ href: resolve('/scores'), label: 'Lihat Skor' }}
		/>
	{/if}
</div>
