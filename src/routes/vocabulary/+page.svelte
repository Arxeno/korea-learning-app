<script lang="ts">
	import data from '$lib/data.json';
	import type { Word } from '$lib/types';
	import { SvelteSet } from 'svelte/reactivity';
	import SearchBar from '$lib/components/SearchBar.svelte';

	let query = $state('');
	let flippedIds = new SvelteSet<number>();

	const filtered = $derived.by(() => {
		const q = query.toLowerCase().trim();
		if (!q) return data as Word[];
		return (data as Word[]).filter(
			(w) =>
				w.hangeul.toLowerCase().includes(q) ||
				w.idMean.toLowerCase().includes(q) ||
				w.category.toLowerCase().includes(q)
		);
	});

	const categories = [...new Set(data.map((w) => w.category))];
	let activeCategory = $state('');

	const displayed = $derived.by(() => {
		let items = filtered;
		if (activeCategory) {
			items = items.filter((w) => w.category === activeCategory);
		}
		return items;
	});

	function toggleFlip(id: number) {
		if (flippedIds.has(id)) {
			flippedIds.delete(id);
		} else {
			flippedIds.add(id);
		}
	}
</script>

<svelte:head>
	<title>Kosa Kata - Hangul Learning</title>
</svelte:head>

<div class="flex flex-col gap-6">
	<div>
		<h1 class="mb-2 text-3xl font-bold text-gray-800">Kosa Kata</h1>
		<p class="text-gray-500">Ketuk kartu untuk melihat arti dalam bahasa Indonesia</p>
	</div>

	<SearchBar bind:value={query} placeholder="Cari berdasarkan Hangul, arti, atau kategori..." />

	<div class="flex flex-wrap gap-2">
		<button
			class="rounded-full px-3 py-1 text-sm font-medium transition-colors {activeCategory === ''
				? 'bg-purple-500 text-white'
				: 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
			onclick={() => (activeCategory = '')}
		>
			Semua ({data.length})
		</button>
		{#each categories as cat (cat)}
			<button
				class="rounded-full px-3 py-1 text-sm font-medium transition-colors {activeCategory === cat
					? 'bg-purple-500 text-white'
					: 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
				onclick={() => (activeCategory = cat)}
			>
				{cat} ({data.filter((w) => w.category === cat).length})
			</button>
		{/each}
	</div>

	{#if displayed.length === 0}
		<div class="py-12 text-center text-gray-400">
			<p class="text-4xl">&#128269;</p>
			<p class="mt-2">Tidak ada kata yang cocok dengan pencarianmu</p>
		</div>
	{:else}
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
			{#each displayed as word (word.id)}
				<button
					class="card perspective-1000 h-48 cursor-pointer"
					onclick={() => toggleFlip(word.id)}
				>
					<div
						class="card-inner relative h-full w-full transition-transform duration-500"
						class:flipped={flippedIds.has(word.id)}
					>
						<div
							class="card-front absolute flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 p-4 text-white shadow-lg"
						>
							<span class="text-2xl font-bold">{word.hangeul}</span>
						</div>
						<div
							class="card-back absolute flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 p-4 text-white shadow-lg"
						>
							<span class="text-lg font-bold">{word.idMean}</span>
							<span class="mt-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">{word.category}</span>
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

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
