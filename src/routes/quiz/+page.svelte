<script lang="ts">
	import data from '$lib/data.json';
	import type { Word, QuizResult } from '$lib/types';
	import { scoreStore } from '$lib/stores.svelte';
	import { resolve } from '$app/paths';
	import QuizOption from '$lib/components/QuizOption.svelte';

	const TOTAL_QUESTIONS = 10;

	let currentIndex = $state(0);
	let score = $state(0);
	let answered = $state(false);
	let selectedAnswer = $state('');
	let correctAnswer = $state('');
	let options = $state<string[]>([]);
	let finished = $state(false);
	let quizWords = $state<Word[]>([]);

	function shuffle<T>(arr: T[]): T[] {
		const a = [...arr];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	function generateOptions(correct: string): string[] {
		const wrongs = (data as Word[]).filter((w) => w.idMean !== correct).map((w) => w.idMean);
		const shuffled = shuffle(wrongs).slice(0, 3);
		return shuffle([correct, ...shuffled]);
	}

	function startQuiz() {
		quizWords = shuffle(data as Word[]).slice(0, TOTAL_QUESTIONS);
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
		options = generateOptions(word.idMean);
	}

	function selectAnswer(answer: string) {
		if (answered) return;
		answered = true;
		selectedAnswer = answer;
		if (answer === correctAnswer) {
			score++;
		}
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

<div class="mx-auto flex max-w-lg flex-col items-center gap-6">
	{#if !finished}
		<div class="w-full">
			<div class="mb-2 flex items-center justify-between text-sm text-gray-500">
				<span>Pertanyaan {currentIndex + 1} / {quizWords.length}</span>
				<span>Skor: {score}</span>
			</div>
			<div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
				<div
					class="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
					style="width: {((currentIndex + 1) / quizWords.length) * 100}%"
				></div>
			</div>
		</div>

		<div
			class="w-full rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-8 text-center text-white shadow-xl"
		>
			<p class="mb-2 text-sm tracking-wider uppercase opacity-80">Apa artinya?</p>
			<p class="text-4xl font-bold">{quizWords[currentIndex].hangeul}</p>
		</div>

		<div class="flex w-full flex-col gap-3">
			{#each options as option (option)}
				<QuizOption
					label={option}
					correct={option === correctAnswer}
					selected={option === selectedAnswer}
					disabled={answered}
					onclick={() => selectAnswer(option)}
				/>
			{/each}
		</div>

		{#if answered}
			<button
				onclick={nextQuestion}
				class="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
			>
				{currentIndex + 1 >= quizWords.length ? 'Lihat Hasil' : 'Pertanyaan Berikutnya'}
			</button>
		{/if}
	{:else}
		<div class="flex flex-col items-center gap-6 py-8">
			<p class="text-6xl">{score >= 8 ? '&#127881;' : score >= 5 ? '&#128170;' : '&#128173;'}</p>
			<h2 class="text-3xl font-bold text-gray-800">Kuis Selesai!</h2>

			<div class="grid w-full grid-cols-3 gap-4">
				<div class="rounded-xl bg-green-100 p-4 text-center">
					<p class="text-2xl font-bold text-green-600">{score}</p>
					<p class="text-sm text-green-500">Benar</p>
				</div>
				<div class="rounded-xl bg-red-100 p-4 text-center">
					<p class="text-2xl font-bold text-red-600">{quizWords.length - score}</p>
					<p class="text-sm text-red-500">Salah</p>
				</div>
				<div class="rounded-xl bg-purple-100 p-4 text-center">
					<p class="text-2xl font-bold text-purple-600">
						{Math.round((score / quizWords.length) * 100)}%
					</p>
					<p class="text-sm text-purple-500">Akurasi</p>
				</div>
			</div>

			<div class="flex w-full gap-3">
				<button
					onclick={startQuiz}
					class="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
				>
					Main Lagi
				</button>
				<a
					href={resolve('/scores')}
					class="flex-1 rounded-xl border-2 border-purple-300 px-6 py-3 text-center font-bold text-purple-600 transition-all hover:bg-purple-50"
				>
					Lihat Skor
				</a>
			</div>
		</div>
	{/if}
</div>
