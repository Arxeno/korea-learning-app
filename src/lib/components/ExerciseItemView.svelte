<script lang="ts">
	import type { ExerciseItem } from '$lib/types';
	import AnswerOption, { answerState, type AnswerState } from './AnswerOption.svelte';
	import { EyeOutline, EyeSlashOutline, LightbulbOutline } from 'flowbite-svelte-icons';

	let { item, number }: { item: ExerciseItem; number: number } = $props();

	let revealed = $state(false);
	let chosen = $state<number | null>(null);
	let tfAnswer = $state<boolean | null>(null);

	const tfStyles: Record<AnswerState, string> = {
		idle: 'cursor-pointer border-paper-3 bg-surface text-ink hover:border-paper-4 hover:bg-paper-2',
		correct: 'animate-pop border-jade-600 bg-jade-600 text-white',
		wrong: 'animate-shake border-coral-500 bg-coral-500 text-white',
		muted: 'border-paper-3 bg-surface text-ink-muted/50'
	};

	const feedbackClass = (ok: boolean) =>
		ok ? 'bg-jade-50 text-jade-700' : 'bg-coral-50 text-coral-700';
</script>

<li class="flex gap-3 border-t border-paper-3 py-5 first:border-t-0 first:pt-0 last:pb-0 sm:gap-4">
	<span
		class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-paper-2 font-serif text-sm font-bold text-ink-soft"
		>{number}</span
	>
	<div class="flex min-w-0 flex-1 flex-col gap-3">
		{#if item.kind === 'reveal'}
			<p lang="ko" class="pt-0.5 text-lg whitespace-pre-line text-ink">{item.prompt}</p>
			<div>
				<button
					type="button"
					class="btn btn-ghost btn-sm"
					aria-expanded={revealed}
					onclick={() => (revealed = !revealed)}
				>
					{#if revealed}
						<EyeSlashOutline class="h-4 w-4" /> Sembunyikan jawaban
					{:else}
						<EyeOutline class="h-4 w-4" /> Lihat jawaban
					{/if}
				</button>
			</div>
			{#if revealed}
				<div
					class="animate-rise rounded-xl border border-jade-100 bg-jade-50 px-4 py-3 text-jade-700"
				>
					<p lang="ko" class="font-serif text-xl whitespace-pre-line">{item.answer}</p>
					{#if item.hint}
						<p class="mt-2 flex items-start gap-1.5 text-sm text-jade-700/90">
							<LightbulbOutline class="mt-0.5 h-4 w-4 shrink-0" />
							<span>{item.hint}</span>
						</p>
					{/if}
				</div>
			{/if}
		{:else if item.kind === 'truefalse'}
			<p lang="ko" class="pt-0.5 text-lg text-ink">{item.statement}</p>
			<div class="flex gap-3">
				{#each [true, false] as value (value)}
					<button
						type="button"
						aria-label={value ? 'Benar (O)' : 'Salah (X)'}
						disabled={tfAnswer !== null}
						onclick={() => (tfAnswer = value)}
						class="grid h-12 w-12 place-items-center rounded-full border-2 font-serif text-xl font-bold transition {tfStyles[
							answerState(value, tfAnswer, item.answer)
						]}"
					>
						{value ? 'O' : 'X'}
					</button>
				{/each}
			</div>
			{#if tfAnswer !== null}
				<p
					role="status"
					class="rounded-xl px-4 py-3 text-sm {feedbackClass(tfAnswer === item.answer)}"
				>
					<strong class="font-semibold">
						{tfAnswer === item.answer ? 'Benar!' : `Jawaban: ${item.answer ? 'O' : 'X'}.`}
					</strong>
					{item.explanation}
				</p>
			{/if}
		{:else}
			<p lang="ko" class="pt-0.5 text-lg text-ink">{item.prompt}</p>
			<div class="grid gap-2 sm:grid-cols-2">
				{#each item.options as option, i (option)}
					<AnswerOption
						label={option}
						index={i}
						size="sm"
						showKey={false}
						lang="ko"
						state={answerState(i, chosen, item.correct)}
						onclick={() => (chosen = i)}
					/>
				{/each}
			</div>
			{#if chosen !== null}
				<p
					role="status"
					class="rounded-xl px-4 py-3 text-sm {feedbackClass(chosen === item.correct)}"
				>
					<strong class="font-semibold">
						{chosen === item.correct ? 'Benar!' : `Jawaban: ${item.options[item.correct]}.`}
					</strong>
					{item.hint ?? ''}
				</p>
			{/if}
		{/if}
	</div>
</li>
