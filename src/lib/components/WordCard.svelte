<script lang="ts">
	import type { Word } from '$lib/types';

	let { word, flipped = $bindable(false) }: { word: Word; flipped?: boolean } = $props();
</script>

<button
	class="card perspective-1000 h-64 w-full cursor-pointer"
	onclick={() => (flipped = !flipped)}
>
	<div class="card-inner relative h-full w-full transition-transform duration-500" class:flipped>
		<div
			class="card-front absolute flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 p-6 text-white shadow-xl"
		>
			<span class="mb-2 text-sm tracking-wider uppercase opacity-80">Korean</span>
			<span class="text-4xl font-bold">{word.hangeul}</span>
			<span class="mt-4 text-xs opacity-70">Ketuk untuk melihat arti</span>
		</div>
		<div
			class="card-back absolute flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 p-6 text-white shadow-xl"
		>
			<span class="mb-2 text-sm tracking-wider uppercase opacity-80">Indonesia</span>
			<span class="text-3xl font-bold">{word.idMean}</span>
			<span class="mt-3 rounded-full bg-white/20 px-3 py-1 text-xs">{word.category}</span>
		</div>
	</div>
</button>

<style>
	.perspective-1000 {
		perspective: 1000px;
	}
	.card-inner {
		transform-style: preserve-3d;
	}
	.card-inner.flipped {
		transform: rotateY(180deg);
	}
	.card-front,
	.card-back {
		backface-visibility: hidden;
	}
	.card-back {
		transform: rotateY(180deg);
	}
</style>
