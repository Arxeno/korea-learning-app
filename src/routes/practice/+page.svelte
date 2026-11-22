<script lang="ts">
	import { lessonExercises } from '$lib/exercises';
	import { resolve } from '$app/paths';
	import { Card } from 'flowbite-svelte';
	import { ClipboardCheckSolid, ClockSolid } from 'flowbite-svelte-icons';

	const lessons = lessonExercises.map((l) => ({
		...l,
		itemCount: l.sets.reduce((sum, s) => sum + s.items.length, 0)
	}));
</script>

<svelte:head>
	<title>Latihan - Hangul Learning</title>
</svelte:head>

<div class="flex flex-col gap-6">
	<div>
		<h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Latihan</h1>
		<p class="text-gray-500">
			Soal dari buku pelajaran beserta jawabannya, dan latihan membaca angka.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each lessons as lesson (lesson.lesson)}
			<a href={resolve('/practice/lesson/[lesson]', { lesson: String(lesson.lesson) })}>
				<Card class="h-full max-w-none p-6 transition-all hover:scale-[1.02] hover:shadow-xl">
					<ClipboardCheckSolid class="mb-3 h-8 w-8 text-indigo-500" />
					<p class="text-sm font-semibold text-purple-600">Pelajaran {lesson.lesson}</p>
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white">{lesson.title}</h2>
					<p class="text-gray-500">{lesson.titleId}</p>
					<p class="mt-2 text-sm text-gray-500">
						{lesson.sets.length} bagian · {lesson.itemCount} soal
					</p>
				</Card>
			</a>
		{/each}

		<a href={resolve('/practice/numbers')}>
			<Card class="h-full max-w-none p-6 transition-all hover:scale-[1.02] hover:shadow-xl">
				<ClockSolid class="mb-3 h-8 w-8 text-pink-500" />
				<p class="text-sm font-semibold text-purple-600">Pelajaran 4 & 5</p>
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Membaca Angka</h2>
				<p class="text-gray-500">Tanggal & jam dalam Hangul</p>
				<p class="mt-2 text-sm text-gray-500">10 soal acak per ronde</p>
			</Card>
		</a>
	</div>
</div>
