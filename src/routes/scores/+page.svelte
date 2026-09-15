<script lang="ts">
	import { scoreStore } from '$lib/stores.svelte';
	import { resolve } from '$app/paths';
	import ScoreBadge from '$lib/components/ScoreBadge.svelte';
</script>

<svelte:head>
	<title>Skor - Hangul Learning</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<div>
		<h1 class="mb-2 text-3xl font-bold text-gray-800">Skor</h1>
		<p class="text-gray-500">Ringkasan hasil belajarmu</p>
	</div>

	<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
		<ScoreBadge value={scoreStore.totalQuizzes} label="Total Kuis" color="purple" />
		<ScoreBadge value={scoreStore.totalCorrect} label="Benar" color="cyan" />
		<ScoreBadge value={scoreStore.totalWrong} label="Salah" color="pink" />
		<ScoreBadge value={scoreStore.accuracy} label="Akurasi %" color="amber" />
	</div>

	{#if scoreStore.results.length === 0}
		<div class="flex flex-col items-center py-12 text-gray-400">
			<p class="text-5xl">&#128203;</p>
			<p class="mt-3 text-lg">Belum ada skor</p>
			<a
				href={resolve('/quiz')}
				class="mt-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
			>
				Mulai Kuis
			</a>
		</div>
	{:else}
		<div class="w-full overflow-hidden rounded-2xl border border-gray-200">
			<table class="w-full text-left text-sm">
				<thead class="bg-gray-50 text-gray-600">
					<tr>
						<th class="px-4 py-3">Tanggal</th>
						<th class="px-4 py-3">Total</th>
						<th class="px-4 py-3">Benar</th>
						<th class="px-4 py-3">Salah</th>
						<th class="px-4 py-3">Akurasi</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					{#each scoreStore.results as result (result.date)}
						<tr class="transition-colors hover:bg-gray-50">
							<td class="px-4 py-3 text-gray-700">
								{new Date(result.date).toLocaleDateString('id-ID', {
									day: 'numeric',
									month: 'short',
									year: 'numeric'
								})}
							</td>
							<td class="px-4 py-3 font-medium">{result.total}</td>
							<td class="px-4 py-3 font-medium text-green-600">{result.correct}</td>
							<td class="px-4 py-3 font-medium text-red-500">{result.wrong}</td>
							<td class="px-4 py-3 font-medium text-purple-600">
								{Math.round((result.correct / result.total) * 100)}%
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<button
			onclick={() => scoreStore.clear()}
			class="self-start rounded-lg border border-red-200 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
		>
			Hapus Semua Skor
		</button>
	{/if}
</div>
