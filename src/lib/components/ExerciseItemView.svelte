<script lang="ts">
	import type { ExerciseItem } from '$lib/types';
	import { Button } from 'flowbite-svelte';

	let { item, number }: { item: ExerciseItem; number: number } = $props();

	let revealed = $state(false);
	let chosen = $state<number | null>(null);
	let tfAnswer = $state<boolean | null>(null);

	function choiceColor(i: number, correct: number): 'green' | 'red' | 'light' {
		if (chosen === null) return 'light';
		if (i === correct) return 'green';
		if (i === chosen) return 'red';
		return 'light';
	}

	function tfColor(value: boolean, answer: boolean): 'green' | 'red' | 'light' {
		if (tfAnswer === null) return 'light';
		if (value === answer) return 'green';
		if (value === tfAnswer) return 'red';
		return 'light';
	}
</script>

<li class="flex flex-col gap-2 border-t border-gray-100 pt-4 first:border-t-0 first:pt-0">
	{#if item.kind === 'reveal'}
		<p class="whitespace-pre-line text-gray-900 dark:text-white">
			<span class="mr-1 text-gray-400">{number}.</span>{item.prompt}
		</p>
		<div>
			<Button size="xs" color="light" onclick={() => (revealed = !revealed)}>
				{revealed ? 'Sembunyikan jawaban' : 'Lihat jawaban'}
			</Button>
		</div>
		{#if revealed}
			<div class="rounded-lg bg-green-50 p-3 text-green-900">
				<p class="text-lg whitespace-pre-line">{item.answer}</p>
				{#if item.hint}
					<p class="mt-1 text-sm text-green-700">💡 {item.hint}</p>
				{/if}
			</div>
		{/if}
	{:else if item.kind === 'truefalse'}
		<p class="text-gray-900 dark:text-white">
			<span class="mr-1 text-gray-400">{number}.</span>{item.statement}
		</p>
		<div class="flex gap-2">
			<Button
				size="sm"
				color={tfColor(true, item.answer)}
				disabled={tfAnswer !== null}
				onclick={() => (tfAnswer = true)}
				class="w-16 text-lg">O</Button
			>
			<Button
				size="sm"
				color={tfColor(false, item.answer)}
				disabled={tfAnswer !== null}
				onclick={() => (tfAnswer = false)}
				class="w-16 text-lg">X</Button
			>
		</div>
		{#if tfAnswer !== null}
			<p
				class="rounded-lg p-3 text-sm {tfAnswer === item.answer
					? 'bg-green-50 text-green-800'
					: 'bg-red-50 text-red-800'}"
			>
				{tfAnswer === item.answer ? 'Benar!' : `Jawaban: ${item.answer ? 'O' : 'X'}.`}
				{item.explanation}
			</p>
		{/if}
	{:else}
		<p class="text-gray-900 dark:text-white">
			<span class="mr-1 text-gray-400">{number}.</span>{item.prompt}
		</p>
		<div class="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
			{#each item.options as option, i (option)}
				<Button
					size="sm"
					color={choiceColor(i, item.correct)}
					disabled={chosen !== null}
					onclick={() => (chosen = i)}
					class="justify-start text-left">{option}</Button
				>
			{/each}
		</div>
		{#if chosen !== null}
			<p
				class="rounded-lg p-3 text-sm {chosen === item.correct
					? 'bg-green-50 text-green-800'
					: 'bg-red-50 text-red-800'}"
			>
				{chosen === item.correct ? 'Benar!' : `Jawaban: ${item.options[item.correct]}.`}
				{item.hint ?? ''}
			</p>
		{/if}
	{/if}
</li>
