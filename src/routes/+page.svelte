<script lang="ts">
	import data from '$lib/data.json';
	import { scoreStore } from '$lib/stores.svelte';
	import { resolve } from '$app/paths';

	const categories = [...new Set(data.map((w) => w.category))];
</script>

<svelte:head>
	<title>Hangul Learning - Belajar Bahasa Korea</title>
</svelte:head>

<div class="flex flex-col items-center gap-12 py-8">
	<div class="text-center">
		<h1 class="mb-4 text-5xl font-extrabold tracking-tight">
			<span
				class="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
			>
				Hangul Learning
			</span>
		</h1>
		<p class="text-lg text-gray-500">Belajar bahasa Korea dengan cara yang menyenangkan!</p>
	</div>

	<div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
		<a
			href={resolve('/vocabulary')}
			class="group flex flex-col items-center rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 p-8 text-center transition-all hover:scale-105 hover:border-pink-300 hover:shadow-xl"
		>
			<span class="mb-3 text-4xl">&#128214;</span>
			<span class="mb-1 text-xl font-bold text-pink-700">Kosa Kata</span>
			<span class="text-sm text-pink-500">{data.length} kata tersedia</span>
		</a>

		<a
			href={resolve('/quiz')}
			class="group flex flex-col items-center rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 text-center transition-all hover:scale-105 hover:border-purple-300 hover:shadow-xl"
		>
			<span class="mb-3 text-4xl">&#129504;</span>
			<span class="mb-1 text-xl font-bold text-purple-700">Kuis</span>
			<span class="text-sm text-purple-500">Uji pengetahuanmu</span>
		</a>

		<a
			href={resolve('/scores')}
			class="group flex flex-col items-center rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-teal-50 p-8 text-center transition-all hover:scale-105 hover:border-cyan-300 hover:shadow-xl"
		>
			<span class="mb-3 text-4xl">&#127942;</span>
			<span class="mb-1 text-xl font-bold text-cyan-700">Skor</span>
			<span class="text-sm text-cyan-500">{scoreStore.totalQuizzes} kuis diselesaikan</span>
		</a>
	</div>

	<div class="w-full">
		<h2 class="mb-4 text-lg font-bold text-gray-700">Kategori</h2>
		<div class="flex flex-wrap gap-2">
			{#each categories as cat (cat)}
				<a
					href={resolve('/vocabulary?q={cat}')}
					class="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-200"
				>
					{cat} ({data.filter((w) => w.category === cat).length})
				</a>
			{/each}
		</div>
	</div>
</div>
