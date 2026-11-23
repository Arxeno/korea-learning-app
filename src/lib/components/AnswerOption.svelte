<script lang="ts" module>
	export type AnswerState = 'idle' | 'correct' | 'wrong' | 'muted';

	/** State of one option once `chosen` (or nothing yet) is compared with `answer`. */
	export function answerState<T>(option: T, chosen: T | null, answer: T): AnswerState {
		if (chosen === null) return 'idle';
		if (option === answer) return 'correct';
		if (option === chosen) return 'wrong';
		return 'muted';
	}
</script>

<script lang="ts">
	import { CheckOutline, CloseOutline } from 'flowbite-svelte-icons';

	let {
		label,
		index,
		state,
		onclick,
		size = 'md',
		showKey = true,
		lang
	}: {
		label: string;
		/** Position in the list; shown as A, B, C… */
		index: number;
		state: AnswerState;
		onclick: () => void;
		size?: 'md' | 'sm';
		showKey?: boolean;
		lang?: string;
	} = $props();

	const styles: Record<AnswerState, { button: string; key: string }> = {
		idle: {
			button:
				'cursor-pointer border-paper-3 bg-surface text-ink hover:border-paper-4 hover:bg-paper-2 hover:shadow-soft',
			key: 'border-paper-3 bg-paper text-ink-muted group-hover:border-ink/30 group-hover:text-ink'
		},
		correct: {
			button: 'animate-pop border-jade-500 bg-jade-50 text-jade-700',
			key: 'border-jade-600 bg-jade-600 text-white'
		},
		wrong: {
			button: 'animate-shake border-coral-500 bg-coral-50 text-coral-700',
			key: 'border-coral-500 bg-coral-500 text-white'
		},
		muted: {
			button: 'border-paper-3 bg-surface/60 text-ink-muted',
			key: 'border-paper-3 text-ink-muted/70'
		}
	};
</script>

<button
	type="button"
	disabled={state !== 'idle'}
	{onclick}
	class="group flex w-full items-center gap-3 border text-left transition {size === 'md'
		? 'rounded-xl px-4 py-3.5 text-lg'
		: 'rounded-lg px-3 py-2.5 text-base'} {styles[state].button}"
>
	{#if showKey}
		<span
			class="grid shrink-0 place-items-center rounded-lg border text-sm font-semibold transition {size ===
			'md'
				? 'h-8 w-8'
				: 'h-6 w-6 text-xs'} {styles[state].key}"
		>
			{String.fromCharCode(65 + index)}
		</span>
	{/if}
	<span class="min-w-0 flex-1 font-medium" {lang}>{label}</span>
	{#if state === 'correct'}
		<CheckOutline class="h-5 w-5 shrink-0 text-jade-600" />
		<span class="sr-only">(jawaban benar)</span>
	{:else if state === 'wrong'}
		<CloseOutline class="h-5 w-5 shrink-0 text-coral-600" />
		<span class="sr-only">(pilihanmu, salah)</span>
	{/if}
</button>
