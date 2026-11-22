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
		onchange
	}: {
		options: Option[];
		/** Selected value; null means the "all" chip. */
		value: T | null;
		allLabel?: string;
		allCount?: number;
		onchange?: (value: T | null) => void;
	} = $props();

	function select(next: T | null) {
		value = next;
		onchange?.(next);
	}

	function chipClass(active: boolean) {
		return active
			? 'bg-purple-500 text-white'
			: 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300';
	}

	const withCount = (label: string, count?: number) =>
		count === undefined ? label : `${label} (${count})`;
</script>

<div class="flex flex-wrap gap-2">
	{#if allLabel}
		<button
			type="button"
			class="rounded-full px-3 py-1 text-base font-medium transition-colors {chipClass(
				value === null
			)}"
			aria-pressed={value === null}
			onclick={() => select(null)}
		>
			{withCount(allLabel, allCount)}
		</button>
	{/if}
	{#each options as opt (opt.value)}
		<button
			type="button"
			class="rounded-full px-3 py-1 text-base font-medium transition-colors {chipClass(
				value === opt.value
			)}"
			aria-pressed={value === opt.value}
			onclick={() => select(opt.value)}
		>
			{withCount(opt.label, opt.count)}
		</button>
	{/each}
</div>
