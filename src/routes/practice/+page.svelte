<script lang="ts">
	import { lessonExercises } from '$lib/exercises';
	import { resolve } from '$app/paths';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { ArrowRightOutline, ClipboardCheckOutline, ClockOutline } from 'flowbite-svelte-icons';

	const lessons = lessonExercises.map((l) => ({
		...l,
		itemCount: l.sets.reduce((sum, s) => sum + s.items.length, 0)
	}));
</script>

<svelte:head>
	<title>Latihan - Hangul Learning</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<PageHeader
		eyebrow="연습"
		title="Latihan"
		subtitle="Soal dari buku pelajaran beserta jawabannya, dan latihan membaca angka."
	/>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each lessons as lesson (lesson.lesson)}
			<a
				href={resolve('/practice/lesson/[lesson]', { lesson: String(lesson.lesson) })}
				class="card card-link group flex flex-col gap-6 p-6"
			>
				<div class="flex items-center justify-between">
					<span class="stamp">Pelajaran {lesson.lesson}</span>
					<span
						class="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-600 ring-1 ring-navy-100"
					>
						<ClipboardCheckOutline class="h-6 w-6" />
					</span>
				</div>
				<div>
					<h2 lang="ko" class="font-serif text-3xl font-bold text-ink">{lesson.title}</h2>
					<p class="mt-1 text-ink-soft">{lesson.titleId}</p>
				</div>
				<div
					class="mt-auto flex items-center justify-between border-t border-paper-3 pt-4 text-sm text-ink-muted"
				>
					<span>{lesson.sets.length} bagian · {lesson.itemCount} soal</span>
					<ArrowRightOutline
						class="h-5 w-5 transition group-hover:translate-x-1 group-hover:text-ink"
					/>
				</div>
			</a>
		{/each}

		<a href={resolve('/practice/numbers')} class="card card-link group flex flex-col gap-6 p-6">
			<div class="flex items-center justify-between">
				<span class="stamp">Pelajaran 4 &amp; 5</span>
				<span
					class="grid h-11 w-11 place-items-center rounded-xl bg-jade-50 text-jade-600 ring-1 ring-jade-100"
				>
					<ClockOutline class="h-6 w-6" />
				</span>
			</div>
			<div>
				<h2 lang="ko" class="font-serif text-3xl font-bold text-ink">숫자 읽기</h2>
				<p class="mt-1 text-ink-soft">Membaca Angka · tanggal &amp; jam dalam Hangul</p>
			</div>
			<div
				class="mt-auto flex items-center justify-between border-t border-paper-3 pt-4 text-sm text-ink-muted"
			>
				<span>10 soal acak per ronde</span>
				<ArrowRightOutline
					class="h-5 w-5 transition group-hover:translate-x-1 group-hover:text-ink"
				/>
			</div>
		</a>
	</div>
</div>
