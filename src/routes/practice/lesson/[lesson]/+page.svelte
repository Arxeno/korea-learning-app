<script lang="ts">
	import ExerciseSet from '$lib/components/ExerciseSet.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { resolve } from '$app/paths';
	import { InfoCircleOutline } from 'flowbite-svelte-icons';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const exercises = $derived(data.exercises);
</script>

<svelte:head>
	<title>Latihan Pelajaran {exercises.lesson} - Hangul Learning</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-4xl flex-col gap-6">
	<PageHeader
		back={{ href: resolve('/practice'), label: 'Latihan' }}
		eyebrow="Pelajaran {exercises.lesson}"
		title={exercises.title}
		titleLang="ko"
		subtitle={exercises.titleId}
	>
		<p
			class="mt-3 flex w-fit items-start gap-2 rounded-xl bg-paper-2 px-3 py-2 text-sm text-ink-soft"
		>
			<InfoCircleOutline class="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />
			<span
				>Soal mendengar (<span lang="ko">듣기</span>) tidak disertakan karena membutuhkan audio CD.</span
			>
		</p>
	</PageHeader>

	{#each exercises.sets as set (set.id)}
		<ExerciseSet {set} />
	{/each}
</div>
