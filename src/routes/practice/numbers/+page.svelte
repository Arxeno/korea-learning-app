<script lang="ts">
	import { dateQuestion, timeQuestion, type DrillQuestion } from '$lib/koreanNumbers';
	import FilterChips from '$lib/components/FilterChips.svelte';
	import { resolve } from '$app/paths';
	import { Button, Card, Progressbar } from 'flowbite-svelte';

	type Mode = 'date' | 'time';
	const ROUNDS = 10;
	const modes: { value: Mode; label: string }[] = [
		{ value: 'date', label: 'Tanggal (Pelajaran 4)' },
		{ value: 'time', label: 'Jam (Pelajaran 5)' }
	];

	let mode = $state<Mode | null>('date');
	let questions = $state<DrillQuestion[]>([]);
	let index = $state(0);
	let score = $state(0);
	let selected = $state<string | null>(null);
	let finished = $state(false);

	const current = $derived(questions[index]);

	function start() {
		const year = new Date().getFullYear();
		questions = Array.from({ length: ROUNDS }, () =>
			mode === 'time' ? timeQuestion() : dateQuestion(year)
		);
		index = 0;
		score = 0;
		selected = null;
		finished = false;
	}

	function choose(option: string) {
		if (selected !== null) return;
		selected = option;
		if (option === current.answer) score++;
	}

	function next() {
		if (index + 1 >= ROUNDS) {
			finished = true;
		} else {
			index++;
			selected = null;
		}
	}

	function optionColor(option: string): 'green' | 'red' | 'light' {
		if (selected === null) return 'light';
		if (option === current.answer) return 'green';
		if (option === selected) return 'red';
		return 'light';
	}

	start();
</script>

<svelte:head>
	<title>Latihan Membaca Angka - Hangul Learning</title>
</svelte:head>

<div class="mx-auto flex max-w-lg flex-col items-center gap-6">
	<div class="w-full">
		<a href={resolve('/practice')} class="text-sm text-purple-600 hover:underline">&larr; Latihan</a
		>
		<h1 class="mt-2 mb-1 text-3xl font-bold text-gray-900 dark:text-white">Membaca Angka</h1>
		<p class="mb-4 text-gray-500">Pilih cara membaca yang benar.</p>
		<FilterChips options={modes} bind:value={mode} onchange={start} />
	</div>

	{#if !finished}
		<div class="w-full">
			<div class="mb-2 flex items-center justify-between text-sm text-gray-500">
				<span>Soal {index + 1} / {ROUNDS}</span>
				<span>Skor: {score}</span>
			</div>
			<Progressbar progress={((index + 1) / ROUNDS) * 100} color="purple" size="h-2.5" />
		</div>

		<Card class="w-full text-center">
			<p class="mb-2 text-sm tracking-wider text-gray-500 uppercase">
				{mode === 'time' ? 'Bagaimana membaca jam ini?' : 'Bagaimana membaca tanggal ini?'}
			</p>
			<p class="text-4xl font-bold text-gray-900 dark:text-white">{current.prompt}</p>
		</Card>

		<div class="flex w-full flex-col gap-3">
			{#each current.options as option (option)}
				<Button
					color={optionColor(option)}
					size="lg"
					disabled={selected !== null}
					onclick={() => choose(option)}
					class="w-full text-left text-lg"
				>
					{option}
				</Button>
			{/each}
		</div>

		{#if selected !== null}
			<p
				class="w-full rounded-lg p-3 text-sm {selected === current.answer
					? 'bg-green-50 text-green-800'
					: 'bg-red-50 text-red-800'}"
			>
				{selected === current.answer ? 'Benar!' : `Jawaban: ${current.answer}.`}
				{current.hint}
			</p>
			<Button color="purple" size="lg" onclick={next} class="w-full">
				{index + 1 >= ROUNDS ? 'Lihat Hasil' : 'Soal Berikutnya'}
			</Button>
		{/if}
	{:else}
		<div class="flex w-full flex-col items-center gap-6 py-8">
			<p class="text-6xl">{score >= 8 ? '🎉' : score >= 5 ? '💪' : '💫'}</p>
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white">
				{score} / {ROUNDS} benar
			</h2>
			<div class="flex w-full gap-3">
				<Button color="purple" size="lg" onclick={start} class="flex-1">Main Lagi</Button>
				<Button color="light" size="lg" href={resolve('/practice')} class="flex-1">Kembali</Button>
			</div>
		</div>
	{/if}
</div>
