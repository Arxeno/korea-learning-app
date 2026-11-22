<script lang="ts">
	import { dateQuestion, timeQuestion, type DrillQuestion } from '$lib/koreanNumbers';
	import FilterChips from '$lib/components/FilterChips.svelte';
	import { resolve } from '$app/paths';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import QuizProgress from '$lib/components/QuizProgress.svelte';
	import AnswerOption, { answerState } from '$lib/components/AnswerOption.svelte';
	import ResultSummary from '$lib/components/ResultSummary.svelte';
	import { revealActions } from '$lib/reveal';

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
	let actions = $state<HTMLElement>();

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
		void revealActions(() => actions);
	}

	function next() {
		if (index + 1 >= ROUNDS) {
			finished = true;
		} else {
			index++;
			selected = null;
		}
	}

	start();
</script>

<svelte:head>
	<title>Latihan Membaca Angka - Hangul Learning</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-xl flex-col gap-6">
	<PageHeader
		back={{ href: resolve('/practice'), label: 'Latihan' }}
		eyebrow="숫자 읽기"
		title="Membaca Angka"
		subtitle="Pilih cara membaca yang benar."
		size="md"
	/>

	<FilterChips options={modes} bind:value={mode} onchange={start} />

	{#if !finished}
		<QuizProgress current={index + 1} total={ROUNDS} {score} label="Soal" />

		<div class="card px-6 py-10 text-center sm:py-12">
			<p class="eyebrow">
				{mode === 'time' ? 'Bagaimana membaca jam ini?' : 'Bagaimana membaca tanggal ini?'}
			</p>
			<p lang="ko" class="mt-4 font-serif text-5xl font-bold text-ink tabular-nums sm:text-6xl">
				{current.prompt}
			</p>
		</div>

		<div class="flex flex-col gap-3">
			{#each current.options as option, i (option)}
				<AnswerOption
					label={option}
					index={i}
					lang="ko"
					state={answerState(option, selected, current.answer)}
					onclick={() => choose(option)}
				/>
			{/each}
		</div>

		{#if selected !== null}
			{@const correct = selected === current.answer}
			<div bind:this={actions} class="flex scroll-mb-28 flex-col gap-3 md:scroll-mb-8">
				<p
					role="status"
					class="rounded-xl px-4 py-3 text-sm {correct
						? 'bg-jade-50 text-jade-700'
						: 'bg-coral-50 text-coral-700'}"
				>
					<strong class="font-semibold">
						{#if correct}Benar! 🎉{:else}Jawaban: <span lang="ko">{current.answer}</span>.{/if}
					</strong>
					{current.hint}
				</p>
				<button type="button" class="btn btn-primary w-full" onclick={next}>
					{index + 1 >= ROUNDS ? 'Lihat Hasil' : 'Soal Berikutnya'}
					<ArrowRightOutline class="h-5 w-5" />
				</button>
			</div>
		{/if}
	{:else}
		<ResultSummary
			title="Latihan Selesai!"
			correct={score}
			total={ROUNDS}
			onrestart={start}
			secondary={{ href: resolve('/practice'), label: 'Kembali ke Latihan' }}
		/>
	{/if}
</div>
