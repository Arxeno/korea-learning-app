<script lang="ts">
	import ExerciseSet from '$lib/components/ExerciseSet.svelte';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const exercises = $derived(data.exercises);
</script>

<svelte:head>
	<title>Latihan Pelajaran {exercises.lesson} - Hangul Learning</title>
</svelte:head>

<div class="flex flex-col gap-6">
	<div>
		<a href={resolve('/practice')} class="text-sm text-purple-600 hover:underline">&larr; Latihan</a
		>
		<p class="mt-2 text-sm font-semibold text-purple-600">Pelajaran {exercises.lesson}</p>
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white">
			{exercises.title} <span class="text-gray-500">· {exercises.titleId}</span>
		</h1>
		<p class="mt-2 text-sm text-gray-500">
			Soal mendengar (듣기) tidak disertakan karena membutuhkan audio CD.
		</p>
	</div>

	{#each exercises.sets as set (set.id)}
		<ExerciseSet {set} />
	{/each}
</div>
