<script lang="ts">
	import { scoreStore } from '$lib/stores.svelte';
	import { resolve } from '$app/paths';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Card,
		Badge
	} from 'flowbite-svelte';
</script>

<svelte:head>
	<title>Skor - Hangul Learning</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<div>
		<h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Skor</h1>
		<p class="text-gray-500">Ringkasan hasil belajarmu</p>
	</div>

	<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
		<Card class="p-5 text-center">
			<p class="text-3xl font-bold text-purple-600">{scoreStore.totalQuizzes}</p>
			<p class="text-sm text-gray-500">Total Kuis</p>
		</Card>
		<Card class="p-5 text-center">
			<p class="text-3xl font-bold text-green-600">{scoreStore.totalCorrect}</p>
			<p class="text-sm text-gray-500">Benar</p>
		</Card>
		<Card class="p-5 text-center">
			<p class="text-3xl font-bold text-red-500">{scoreStore.totalWrong}</p>
			<p class="text-sm text-gray-500">Salah</p>
		</Card>
		<Card class="p-5 text-center">
			<p class="text-3xl font-bold text-amber-500">{scoreStore.accuracy}%</p>
			<p class="text-sm text-gray-500">Akurasi</p>
		</Card>
	</div>

	{#if scoreStore.results.length === 0}
		<div class="flex flex-col items-center py-12 text-gray-400">
			<p class="text-5xl">&#128203;</p>
			<p class="mt-3 text-lg">Belum ada skor</p>
			<Button color="purple" href={resolve('/quiz')} class="mt-4">Mulai Kuis</Button>
		</div>
	{:else}
		<div class="w-full overflow-x-auto">
			<Table hoverable>
				<TableHead>
					<TableHeadCell>Tanggal</TableHeadCell>
					<TableHeadCell>Total</TableHeadCell>
					<TableHeadCell>Benar</TableHeadCell>
					<TableHeadCell>Salah</TableHeadCell>
					<TableHeadCell>Akurasi</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each scoreStore.results as result (result.date)}
						<TableBodyRow>
							<TableBodyCell>
								{new Date(result.date).toLocaleDateString('id-ID', {
									day: 'numeric',
									month: 'short',
									year: 'numeric'
								})}
							</TableBodyCell>
							<TableBodyCell>{result.total}</TableBodyCell>
							<TableBodyCell>
								<Badge color="green">{result.correct}</Badge>
							</TableBodyCell>
							<TableBodyCell>
								<Badge color="red">{result.wrong}</Badge>
							</TableBodyCell>
							<TableBodyCell>
								<Badge color="purple">{Math.round((result.correct / result.total) * 100)}%</Badge>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>

		<Button color="red" outline size="sm" onclick={() => scoreStore.clear()} class="self-start">
			Hapus Semua Skor
		</Button>
	{/if}
</div>
