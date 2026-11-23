<script lang="ts">
	import { StarSolid } from 'flowbite-svelte-icons';

	let {
		current,
		total,
		score,
		label = 'Pertanyaan'
	}: {
		/** 1-based number of the question on screen. */
		current: number;
		total: number;
		score: number;
		label?: string;
	} = $props();
</script>

<div class="w-full">
	<div class="mb-2 flex items-center justify-between text-sm">
		<span class="text-ink-muted">
			{label}
			<span class="font-serif text-base font-bold text-ink">{current}</span>
			/ {total}
		</span>
		<span class="tag">
			<StarSolid class="h-3.5 w-3.5 text-gold-500" />
			Skor {score}
		</span>
	</div>
	<div
		class="h-2 overflow-hidden rounded-full bg-paper-3"
		role="progressbar"
		aria-label="Kemajuan"
		aria-valuemin={0}
		aria-valuemax={total}
		aria-valuenow={current}
	>
		<div
			class="h-full rounded-full bg-coral-500 transition-[width] duration-500 ease-out"
			style:width="{(current / total) * 100}%"
		></div>
	</div>
</div>
