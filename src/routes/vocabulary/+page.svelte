<script lang="ts">
	import { words, lessonKey, lessonLabel, lessonsIn, type LessonKey } from '$lib/vocab';
	import type { Category, Word } from '$lib/types';
	import { page } from '$app/state';
	import { SvelteSet } from 'svelte/reactivity';
	import { Input, Badge } from 'flowbite-svelte';
	import FilterChips from '$lib/components/FilterChips.svelte';

	function parseLesson(raw: string | null): LessonKey | null {
		if (raw === 'umum') return 'umum';
		const n = Number(raw);
		return raw && Number.isInteger(n) ? n : null;
	}

	let query = $state(page.url.searchParams.get('q') ?? '');
	let activeLesson = $state<LessonKey | null>(parseLesson(page.url.searchParams.get('lesson')));
	let activeTopic = $state<string | null>(null);
	let activeCategory = $state<Category | null>(null);
	let flippedIds = new SvelteSet<number>();

	// [key, count] pairs in first-seen order.
	const countBy = <K extends string>(list: Word[], key: (w: Word) => K) => {
		const counts: Partial<Record<K, number>> = {};
		for (const w of list) counts[key(w)] = (counts[key(w)] ?? 0) + 1;
		return Object.entries(counts) as [K, number][];
	};

	const lessonOptions = lessonsIn(words).map((key) => ({
		value: key,
		label: lessonLabel(key),
		count: words.filter((w) => lessonKey(w) === key).length
	}));

	const inLesson = $derived(
		activeLesson === null ? words : words.filter((w) => lessonKey(w) === activeLesson)
	);

	// Topics only make sense inside one textbook lesson.
	const topicOptions = $derived.by(() => {
		if (typeof activeLesson !== 'number') return [];
		return countBy(inLesson, (w) => w.topic ?? '')
			.filter(([topic]) => topic)
			.map(([topic, count]) => ({ value: topic, label: topic, count }));
	});

	const inTopic = $derived(
		activeTopic === null ? inLesson : inLesson.filter((w) => w.topic === activeTopic)
	);

	const categoryOptions = $derived(
		countBy(inTopic, (w) => w.category).map(([cat, count]) => ({
			value: cat,
			label: cat,
			count
		}))
	);

	const displayed = $derived.by(() => {
		let items =
			activeCategory === null ? inTopic : inTopic.filter((w) => w.category === activeCategory);
		const q = query.toLowerCase().trim();
		if (q) {
			items = items.filter(
				(w) =>
					w.hangeul.toLowerCase().includes(q) ||
					w.phonetic.toLowerCase().includes(q) ||
					w.idMean.toLowerCase().includes(q) ||
					w.category.toLowerCase().includes(q) ||
					(w.topic ?? '').toLowerCase().includes(q)
			);
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

<div class="flex w-full flex-col gap-6">
	<div>
		<h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Kosa Kata</h1>
		<p class="text-gray-500">Ketuk kartu untuk melihat arti dalam bahasa Indonesia</p>
	</div>

	<div class="relative">
		<Input
			type="text"
			placeholder="Cari berdasarkan Hangul, arti, kategori, atau topik..."
			bind:value={query}
		/>
	</div>

	<div class="flex flex-col gap-3">
		<div>
			<p class="mb-2 text-sm font-semibold text-gray-500">Pelajaran</p>
			<FilterChips
				options={lessonOptions}
				bind:value={activeLesson}
				allLabel="Semua"
				allCount={words.length}
				onchange={() => {
					activeTopic = null;
					activeCategory = null;
				}}
			/>
		</div>
		{#if topicOptions.length > 0}
			<div>
				<p class="mb-2 text-sm font-semibold text-gray-500">Topik</p>
				<FilterChips
					options={topicOptions}
					bind:value={activeTopic}
					allLabel="Semua topik"
					allCount={inLesson.length}
					onchange={() => (activeCategory = null)}
				/>
			</div>
		{/if}
		<div>
			<p class="mb-2 text-sm font-semibold text-gray-500">Kategori</p>
			<FilterChips
				options={categoryOptions}
				bind:value={activeCategory}
				allLabel="Semua kategori"
				allCount={inTopic.length}
			/>
		</div>
	</div>

	{#if displayed.length === 0}
		<div class="py-12 text-center text-gray-400">
			<p class="text-4xl">&#128269;</p>
			<p class="mt-2">Tidak ada kata yang cocok dengan pencarianmu</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4">
			{#each displayed as word (word.id)}
				<button class="perspective-1000 h-48 cursor-pointer" onclick={() => toggleFlip(word.id)}>
					<div
						class="card-inner relative h-full w-full transition-transform duration-500"
						class:flipped={flippedIds.has(word.id)}
					>
						<div
							class="card-front absolute flex h-full w-full flex-col items-center justify-center rounded-xl border border-pink-200 bg-gradient-to-br from-pink-400 to-rose-500 p-4 text-white shadow-lg"
						>
							<span class="font-bold {word.hangeul.length > 6 ? 'text-3xl' : 'text-4xl'}"
								>{word.hangeul}</span
							>
							<span class="mt-1 text-lg text-white/80 italic">{word.phonetic}</span>
						</div>
						<div
							class="card-back absolute flex h-full w-full flex-col items-center justify-center rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-400 to-purple-500 p-4 text-white shadow-lg"
						>
							<span class="font-bold {word.idMean.length > 14 ? 'text-2xl' : 'text-4xl'}"
								>{word.idMean}</span
							>
							<div class="mt-2 flex flex-wrap justify-center gap-1">
								<Badge color="gray" class="text-base">{word.category}</Badge>
								{#if word.topic}
									<Badge color="indigo" class="text-base">{word.topic}</Badge>
								{/if}
							</div>
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
