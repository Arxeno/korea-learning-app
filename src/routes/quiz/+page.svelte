<script lang="ts">
	import { words, lessonKey, lessonLabel, lessonsIn, type LessonKey } from '$lib/vocab';
	import type { Word, QuizResult } from '$lib/types';
	import FilterChips from '$lib/components/FilterChips.svelte';
	import { scoreStore, wordStatsStore } from '$lib/stores.svelte';
	import { selectQuizWords } from '$lib/scheduler';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { ResolvedPathname } from '$app/types';
	import { Button, Progressbar, Card } from 'flowbite-svelte';
	import { shouldPromptAfterQuiz } from '$lib/registerPrompt';
	import RegisterPromptDialog from '$lib/components/RegisterPromptDialog.svelte';

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
	let registerPromptOpen = $state(false);
	// resolve() has no query-string support; appending one still yields a resolved app path.
	const signUpHref = (resolve('/auth/sign-up') + '?redirectTo=%2Fscores') as ResolvedPathname;

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
			// Guests: invite them to keep this progress in an account (snoozed for 7 days when dismissed).
			if (!page.data.user && shouldPromptAfterQuiz()) registerPromptOpen = true;
		} else {
			currentIndex++;
			loadQuestion();
		}
	}

	function getOptionColor(option: string): 'green' | 'red' | 'light' {
		if (!answered) return 'light';
		if (option === correctAnswer) return 'green';
		if (option === selectedAnswer && option !== correctAnswer) return 'red';
		return 'light';
	}

	startQuiz();
</script>

<svelte:head>
	<title>Kuis - Hangul Learning</title>
</svelte:head>

<div class="mx-auto flex max-w-lg flex-col items-center gap-6">
	<div class="w-full">
		<p class="mb-2 text-sm font-semibold text-gray-500">Pilih pelajaran</p>
		<FilterChips
			options={lessonOptions}
			bind:value={activeLesson}
			allLabel="Semua"
			onchange={startQuiz}
		/>
	</div>

	{#if !finished}
		<div class="w-full">
			<div class="mb-2 flex items-center justify-between text-sm text-gray-500">
				<span>Pertanyaan {currentIndex + 1} / {quizWords.length}</span>
				<span>Skor: {score}</span>
			</div>
			<Progressbar
				progress={((currentIndex + 1) / quizWords.length) * 100}
				color="purple"
				size="h-2.5"
			/>
		</div>

		<Card class="w-full text-center">
			<p class="mb-2 text-sm tracking-wider text-gray-500 uppercase">Apa artinya?</p>
			<p class="text-4xl font-bold text-gray-900 dark:text-white">
				{quizWords[currentIndex].hangeul}
			</p>
			<p class="mt-1 text-sm text-gray-500 italic">{quizWords[currentIndex].phonetic}</p>
		</Card>

		<div class="flex w-full flex-col gap-3">
			{#each options as option (option)}
				<Button
					color={getOptionColor(option)}
					size="lg"
					disabled={answered}
					onclick={() => selectAnswer(option)}
					class="w-full text-left"
				>
					{option}
				</Button>
			{/each}
		</div>

		{#if answered}
			<Button color="purple" size="lg" onclick={nextQuestion} class="w-full">
				{currentIndex + 1 >= quizWords.length ? 'Lihat Hasil' : 'Pertanyaan Berikutnya'}
			</Button>
		{/if}
	{:else}
		<div class="flex flex-col items-center gap-6 py-8">
			<p class="text-6xl">{score >= 8 ? '🎉' : score >= 5 ? '💪' : '💫'}</p>
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white">Kuis Selesai!</h2>

			<div class="grid w-full grid-cols-3 gap-4">
				<Card class="p-4 text-center">
					<p class="text-2xl font-bold text-green-600">{score}</p>
					<p class="text-sm text-green-500">Benar</p>
				</Card>
				<Card class="p-4 text-center">
					<p class="text-2xl font-bold text-red-600">{quizWords.length - score}</p>
					<p class="text-sm text-red-500">Salah</p>
				</Card>
				<Card class="p-4 text-center">
					<p class="text-2xl font-bold text-purple-600">
						{Math.round((score / quizWords.length) * 100)}%
					</p>
					<p class="text-sm text-purple-500">Akurasi</p>
				</Card>
			</div>

			<div class="flex w-full gap-3">
				<Button color="purple" size="lg" onclick={startQuiz} class="flex-1">Main Lagi</Button>
				<Button color="light" size="lg" href={resolve('/scores')} class="flex-1">Lihat Skor</Button>
			</div>

			{#if !page.data.user}
				<p class="text-center text-sm text-gray-500">
					<a href={signUpHref} class="font-medium text-purple-600 hover:underline"> Daftar </a>
					supaya progress-mu tersimpan di akun.
				</p>
			{/if}
		</div>
	{/if}
</div>

<RegisterPromptDialog
	bind:open={registerPromptOpen}
	variant="after-quiz"
	quizCount={scoreStore.totalQuizzes}
	wordCount={wordStatsStore.practicedCount}
	redirectTo="/scores"
/>
