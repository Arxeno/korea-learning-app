<script lang="ts">
	import type { ExerciseSet } from '$lib/types';
	import ExerciseItemView from './ExerciseItemView.svelte';

	let { set }: { set: ExerciseSet } = $props();
</script>

<section id={set.id} class="card scroll-mt-24 p-5 sm:p-7">
	<div class="mb-2 flex flex-wrap items-center gap-3">
		<span class="stamp">Hal. {set.page}</span>
		<h2 class="font-serif text-xl font-bold text-ink">{set.title}</h2>
	</div>
	<p class="mb-5 text-sm text-ink-soft">{set.instruction}</p>
	{#if set.context}
		<div
			lang="ko"
			class="mb-6 flex flex-col gap-2 rounded-r-xl border-l-4 border-coral-500/70 bg-paper-2 px-4 py-3 font-serif leading-relaxed text-ink"
		>
			{#each set.context as line, i (i)}
				<p>{line}</p>
			{/each}
		</div>
	{/if}
	<ol class="flex flex-col">
		{#each set.items as item, i (i)}
			<ExerciseItemView {item} number={i + 1} />
		{/each}
	</ol>
</section>
