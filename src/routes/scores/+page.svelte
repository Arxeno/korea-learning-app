<script lang="ts">
	import { scoreStore } from '$lib/stores.svelte';
	import { toTrendPoints } from '$lib/scoreChart';
	import AccuracyTrend from '$lib/components/AccuracyTrend.svelte';
	import ScoreBars from '$lib/components/ScoreBars.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import { resolve } from '$app/paths';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	const points = $derived.by(() => toTrendPoints(scoreStore.results));
	const showTrend = $derived(points.length >= 2);

	const pct = (correct: number, total: number) =>
		total === 0 ? 0 : Math.round((correct / total) * 100);

	const formatDate = (iso: string) =>
		new Date(iso).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
</script>

<svelte:head>
	<title>Skor - Hangul Learning</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<PageHeader eyebrow="점수" title="Skor" subtitle="Ringkasan hasil belajarmu" />

	<div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
		<StatCard tone="navy" value={scoreStore.totalQuizzes} label="Total Kuis" />
		<StatCard tone="jade" value={scoreStore.totalCorrect} label="Benar" />
		<StatCard tone="coral" value={scoreStore.totalWrong} label="Salah" />
		<StatCard tone="gold" value="{scoreStore.accuracy}%" label="Akurasi" />
	</div>

	{#if scoreStore.results.length === 0}
		<div class="card flex flex-col items-center gap-3 px-6 py-16 text-center">
			<p lang="ko" class="font-serif text-4xl font-bold text-ink">아직 기록이 없어요</p>
			<p class="text-ink-muted">Belum ada skor. Selesaikan satu kuis untuk mulai mencatat.</p>
			<a href={resolve('/quiz')} class="btn btn-primary mt-3">
				Mulai Kuis
				<ArrowRightOutline class="h-5 w-5" />
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4 {showTrend ? 'lg:grid-cols-2' : ''}">
			{#if showTrend}
				<section class="card p-5 sm:p-6">
					<h2 class="font-serif text-xl font-bold text-ink">Tren Akurasi</h2>
					<p class="mb-4 text-sm text-ink-muted">Akurasi % per kuis, terlama ke terbaru</p>
					<AccuracyTrend {points} />
				</section>
			{/if}
			<section class="card p-5 sm:p-6">
				<h2 class="font-serif text-xl font-bold text-ink">Benar vs Salah per Kuis</h2>
				<p class="mb-4 text-sm text-ink-muted">Perbandingan jawaban tiap kuis</p>
				<ScoreBars {points} />
			</section>
		</div>

		<section class="card overflow-hidden">
			<h2 class="border-b border-paper-3 px-5 py-4 font-serif text-xl font-bold text-ink sm:px-6">
				Riwayat Kuis
			</h2>
			<div class="overflow-x-auto">
				<table class="w-full min-w-[20rem] text-left text-sm">
					<thead class="bg-paper-2/60 text-ink-muted">
						<tr>
							<th scope="col" class="py-3 pr-2 pl-5 font-semibold sm:px-6">Tanggal</th>
							<th scope="col" class="hidden px-3 py-3 text-center font-semibold sm:table-cell"
								>Total</th
							>
							<th scope="col" class="px-2 py-3 text-center font-semibold sm:px-3">Benar</th>
							<th scope="col" class="px-2 py-3 text-center font-semibold sm:px-3">Salah</th>
							<th scope="col" class="py-3 pr-5 pl-2 font-semibold sm:px-6">Akurasi</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-paper-3">
						{#each scoreStore.results as result (result.date)}
							{@const accuracy = pct(result.correct, result.total)}
							<tr class="transition hover:bg-paper-2/50">
								<td class="py-3.5 pr-2 pl-5 font-medium whitespace-nowrap text-ink sm:px-6">
									{formatDate(result.date)}
								</td>
								<td class="hidden px-3 py-3.5 text-center text-ink-soft tabular-nums sm:table-cell"
									>{result.total}</td
								>
								<td class="px-2 py-3.5 text-center sm:px-3">
									<span
										class="inline-block min-w-8 rounded-md bg-jade-50 px-2 py-0.5 font-semibold text-jade-700 tabular-nums"
										>{result.correct}</span
									>
								</td>
								<td class="px-2 py-3.5 text-center sm:px-3">
									<span
										class="inline-block min-w-8 rounded-md bg-coral-50 px-2 py-0.5 font-semibold text-coral-700 tabular-nums"
										>{result.wrong}</span
									>
								</td>
								<td class="py-3.5 pr-5 pl-2 sm:px-6">
									<div class="flex items-center gap-3">
										<div class="h-1.5 w-12 overflow-hidden rounded-full bg-paper-3 sm:w-20">
											<div
												class="h-full rounded-full {accuracy >= 80
													? 'bg-jade-500'
													: accuracy >= 50
														? 'bg-gold-500'
														: 'bg-coral-500'}"
												style:width="{accuracy}%"
											></div>
										</div>
										<span class="font-semibold text-ink tabular-nums">{accuracy}%</span>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{/if}
</div>
