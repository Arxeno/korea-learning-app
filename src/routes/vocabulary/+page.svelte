<script lang="ts">
	import { words, lessonKey, lessonLabel, lessonsIn, type LessonKey } from '$lib/vocab';
	import type { Category, Word } from '$lib/types';
	import { page } from '$app/state';
	import { SvelteSet } from 'svelte/reactivity';
	import { RefreshOutline, SearchOutline } from 'flowbite-svelte-icons';
	import FilterChips from '$lib/components/FilterChips.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

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

	// Text tiers keep long entries (e.g. "다음 해 / 내년", "berangkat kerja / masuk kantor")
	// inside a two-column phone grid without shrinking the short ones.
	function hangeulSize(text: string) {
		if (text.length <= 2) return 'text-4xl sm:text-5xl';
		if (text.length <= 4) return 'text-3xl sm:text-4xl';
		if (text.length <= 6) return 'text-2xl sm:text-3xl';
		return 'text-xl sm:text-2xl';
	}

	function meaningSize(text: string) {
		if (text.length <= 10) return 'text-xl sm:text-2xl';
		if (text.length <= 18) return 'text-lg sm:text-xl';
		return 'text-base sm:text-lg';
	}

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
	<PageHeader
		eyebrow="단어"
		title="Kosa Kata"
		subtitle="Ketuk kartu untuk melihat arti dalam bahasa Indonesia"
	/>

	<label class="relative block">
		<span class="sr-only">Cari kata</span>
		<SearchOutline
			class="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-ink-muted"
		/>
		<input
			type="search"
			placeholder="Cari Hangul, arti, kategori, atau topik…"
			bind:value={query}
			class="w-full rounded-xl border border-paper-3 bg-surface py-3.5 pr-4 pl-12 text-ink shadow-soft transition placeholder:text-ink-muted/80 focus:border-paper-4"
		/>
	</label>

	<div class="card flex flex-col gap-4 p-4 sm:p-5">
		<div class="flex flex-col gap-2">
			<p class="eyebrow">Pelajaran</p>
			<FilterChips
				scroll
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
			<div class="flex flex-col gap-2">
				<p class="eyebrow">Topik</p>
				<FilterChips
					scroll
					options={topicOptions}
					bind:value={activeTopic}
					allLabel="Semua topik"
					allCount={inLesson.length}
					onchange={() => (activeCategory = null)}
				/>
			</div>
		{/if}
		<div class="flex flex-col gap-2">
			<p class="eyebrow">Kategori</p>
			<FilterChips
				scroll
				options={categoryOptions}
				bind:value={activeCategory}
				allLabel="Semua kategori"
				allCount={inTopic.length}
			/>
		</div>
	</div>

	{#if displayed.length === 0}
		<div class="card flex flex-col items-center gap-2 px-6 py-14 text-center">
			<p class="font-serif text-3xl text-ink" lang="ko">없어요…</p>
			<p class="text-ink-muted">Tidak ada kata yang cocok dengan pencarianmu</p>
		</div>
	{:else}
		<div class="flex items-center justify-between text-sm text-ink-muted">
			<p>Menampilkan <span class="font-semibold text-ink">{displayed.length}</span> kata</p>
			{#if flippedIds.size > 0}
				<button type="button" class="btn btn-ghost btn-sm" onclick={() => flippedIds.clear()}>
					<RefreshOutline class="h-4 w-4" />
					Tutup semua
				</button>
			{/if}
		</div>
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
			{#each displayed as word (word.id)}
				{@const flipped = flippedIds.has(word.id)}
				<button
					type="button"
					class="flip-card group h-40 cursor-pointer rounded-2xl text-center sm:h-44"
					aria-pressed={flipped}
					aria-label="{word.hangeul} ({word.phonetic}){flipped ? `: ${word.idMean}` : ''}"
					onclick={() => toggleFlip(word.id)}
				>
					<div
						class="card-inner relative h-full w-full transition-transform duration-500"
						class:flipped
					>
						<div
							class="card-face card absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 transition group-hover:border-paper-4 group-hover:shadow-lift"
						>
							<span
								class="absolute top-3 left-3 text-[10px] font-semibold tracking-wider text-ink-muted/80 uppercase"
								>{lessonLabel(lessonKey(word))}</span
							>
							<span
								lang="ko"
								class="font-serif leading-tight font-bold text-balance text-ink {hangeulSize(
									word.hangeul
								)}">{word.hangeul}</span
							>
							<span class="text-sm text-balance text-ink-muted italic">{word.phonetic}</span>
							<RefreshOutline
								class="absolute right-3 bottom-3 h-4 w-4 text-ink-muted/40 transition group-hover:text-ink-muted"
							/>
						</div>
						<div
							class="card-face card-back absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-ink p-3 text-paper shadow-lift"
						>
							<span class="font-semibold text-balance break-words {meaningSize(word.idMean)}"
								>{word.idMean}</span
							>
							<div class="flex flex-wrap justify-center gap-1">
								<span class="rounded-md bg-white/10 px-2 py-0.5 text-xs text-paper/80"
									>{word.category}</span
								>
								{#if word.topic}
									<span class="rounded-md bg-coral-500/25 px-2 py-0.5 text-xs text-coral-100"
										>{word.topic}</span
									>
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
	.flip-card {
		perspective: 1000px;
	}
	.card-inner {
		transform-style: preserve-3d;
	}
	.card-inner.flipped {
		transform: rotateY(180deg);
	}
	.card-face {
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}
	.card-back {
		transform: rotateY(180deg);
	}
</style>
