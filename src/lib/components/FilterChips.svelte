<script lang="ts" generics="T extends string | number">
	interface Option {
		value: T;
		label: string;
		count?: number;
	}

	let {
		options,
		value = $bindable(),
		allLabel,
		allCount,
		scroll = false,
		onchange
	}: {
		options: Option[];
		/** Selected value; null means the "all" chip. */
		value: T | null;
		allLabel?: string;
		allCount?: number;
		/** Keep chips on one swipeable row on small screens instead of wrapping. */
		scroll?: boolean;
		onchange?: (value: T | null) => void;
	} = $props();

	function select(next: T | null) {
		value = next;
		onchange?.(next);
	}
</script>

{#snippet chip(label: string, count: number | undefined, active: boolean, next: T | null)}
	<button
		type="button"
		class="chip {active ? 'chip-active' : ''}"
		aria-pressed={active}
		onclick={() => select(next)}
	>
		{label}
		{#if count !== undefined}
			<span class="text-xs tabular-nums {active ? 'text-paper/60' : 'text-ink-muted'}">{count}</span
			>
		{/if}
	</button>
{/snippet}

<div
	class="flex gap-2 {scroll
		? 'no-scrollbar -mx-4 overflow-x-auto px-4 pb-0.5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0'
		: 'flex-wrap'}"
>
	{#if allLabel}
		{@render chip(allLabel, allCount, value === null, null)}
	{/if}
	{#each options as opt (opt.value)}
		{@render chip(opt.label, opt.count, value === opt.value, opt.value)}
	{/each}
</div>
