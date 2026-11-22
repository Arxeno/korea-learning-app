<script lang="ts">
	import type { ExerciseSet } from '$lib/types';
	import { Badge, Card } from 'flowbite-svelte';
	import ExerciseItemView from './ExerciseItemView.svelte';

	let { set }: { set: ExerciseSet } = $props();
</script>

<Card class="w-full max-w-none p-5" id={set.id}>
	<div class="mb-2 flex flex-wrap items-center gap-2">
		<Badge color="purple">Hal. {set.page}</Badge>
		<h2 class="text-lg font-bold text-gray-900 dark:text-white">{set.title}</h2>
	</div>
	<p class="mb-3 text-sm text-gray-600 dark:text-gray-300">{set.instruction}</p>
	{#if set.context}
		<div class="mb-4 flex flex-col gap-1 rounded-lg bg-amber-50 p-3 text-gray-800">
			{#each set.context as line, i (i)}
				<p>{line}</p>
			{/each}
		</div>
	{/if}
	<ol class="flex flex-col gap-4">
		{#each set.items as item, i (i)}
			<ExerciseItemView {item} number={i + 1} />
		{/each}
	</ol>
</Card>
