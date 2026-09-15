<script lang="ts">
	import data from '$lib/data.json';
	import { scoreStore } from '$lib/stores.svelte';
	import { resolve } from '$app/paths';
	import { Card, Badge } from 'flowbite-svelte';
	import { BookOutline, BrainSolid, AwardSolid } from 'flowbite-svelte-icons';

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

	<div class="grid w-full grid-cols-1 justify-items-stretch gap-6 sm:grid-cols-3">
		<a href={resolve('/vocabulary')} class="flex justify-center">
			<Card
				class="flex flex-col items-center p-8 text-center transition-all hover:scale-105 hover:shadow-xl"
			>
				<BookOutline class="mb-3 h-10 w-10 text-pink-500" />
				<h5 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">Kosa Kata</h5>
				<span class="text-sm text-gray-500">{data.length} kata tersedia</span>
			</Card>
		</a>

		<a href={resolve('/quiz')} class="flex justify-center">
			<Card
				class="flex flex-col items-center p-8 text-center transition-all hover:scale-105 hover:shadow-xl"
			>
				<BrainSolid class="mb-3 h-10 w-10 text-purple-500" />
				<h5 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">Kuis</h5>
				<span class="text-sm text-gray-500">Uji pengetahuanmu</span>
			</Card>
		</a>

		<a href={resolve('/scores')} class="flex justify-center">
			<Card
				class="flex flex-col items-center p-8 text-center transition-all hover:scale-105 hover:shadow-xl"
			>
				<AwardSolid class="mb-3 h-10 w-10 text-amber-500" />
				<h5 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">Skor</h5>
				<span class="text-sm text-gray-500">{scoreStore.totalQuizzes} kuis diselesaikan</span>
			</Card>
		</a>
	</div>

	<div class="w-full">
		<h2 class="mb-4 text-lg font-bold text-gray-700">Kategori</h2>
		<div class="flex flex-wrap gap-2">
			{#each categories as cat (cat)}
				<Badge href={resolve('/vocabulary?q={cat}')} color="purple" large>
					{cat} ({data.filter((w) => w.category === cat).length})
				</Badge>
			{/each}
		</div>
	</div>
</div>
