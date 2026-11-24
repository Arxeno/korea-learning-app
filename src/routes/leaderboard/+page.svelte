<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRightOutline, UsersGroupOutline } from 'flowbite-svelte-icons';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import type { LeaderboardEntry } from '$lib/types';

	let { data } = $props();

	const board = $derived(data.leaderboard);
	// The signed-in user's place, when it is below the places shown in the table.
	const pinnedMe = $derived(
		board.me && !board.entries.some((entry) => entry.isMe) ? board.me : null
	);

	const weekLabel = $derived.by(() => {
		const format = (date: Date, withYear: boolean) =>
			date.toLocaleDateString('id-ID', {
				day: 'numeric',
				month: 'short',
				year: withYear ? 'numeric' : undefined,
				timeZone: 'Asia/Jakarta'
			});
		const lastMoment = new Date(Date.parse(board.weekEnd) - 1);
		return `${format(new Date(board.weekStart), false)} – ${format(lastMoment, true)}`;
	});

	const returnTo = encodeURIComponent('/leaderboard');

	const medals: Record<number, string> = {
		1: 'bg-gold-500 text-surface',
		2: 'bg-paper-4 text-ink',
		3: 'bg-coral-200 text-coral-700'
	};
</script>

<svelte:head>
	<title>Peringkat - Hangul Learning</title>
</svelte:head>

{#snippet row(entry: LeaderboardEntry)}
	<tr class="transition {entry.isMe ? 'bg-coral-50/70' : 'hover:bg-paper-2/50'}">
		<td class="py-3 pr-2 pl-4 sm:pl-6">
			<span
				class="grid h-8 w-8 place-items-center rounded-full font-serif text-sm font-bold tabular-nums {medals[
					entry.rank
				] ?? 'bg-paper-2 text-ink-soft'}">{entry.rank}</span
			>
		</td>
		<td class="w-full max-w-0 px-2 py-3">
			<div class="flex items-center gap-2">
				<span class="truncate font-medium text-ink">{entry.name}</span>
				{#if entry.isMe}
					<span class="tag shrink-0 bg-coral-100 text-coral-700">Kamu</span>
				{/if}
			</div>
		</td>
		<td class="px-2 py-3 text-center font-serif text-lg font-bold text-ink tabular-nums sm:px-3">
			{entry.quizzes}
		</td>
		<td class="px-2 py-3 text-center sm:px-3">
			<span
				class="inline-block min-w-8 rounded-md bg-jade-50 px-2 py-0.5 font-semibold text-jade-700 tabular-nums"
				>{entry.correct}</span
			>
		</td>
		<td class="hidden py-3 pr-6 pl-3 text-right text-ink-soft tabular-nums sm:table-cell">
			{entry.accuracy}%
		</td>
	</tr>
{/snippet}

<div class="flex flex-col gap-8">
	<PageHeader eyebrow="순위" title="Peringkat" subtitle="Siapa yang paling rajin kuis minggu ini?">
		<div class="mt-3 flex flex-wrap items-center gap-2">
			<span class="stamp">{weekLabel}</span>
			<span class="tag">Reset setiap Senin 00:00 WIB</span>
		</div>
	</PageHeader>

	{#if !data.user}
		<section
			class="card flex flex-col items-start gap-4 border-coral-100 p-6 sm:flex-row sm:items-center sm:p-7"
		>
			<span
				class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral-50 text-coral-600 ring-1 ring-coral-100"
			>
				<UsersGroupOutline class="h-6 w-6" />
			</span>
			<div class="flex-1">
				<h2 class="font-serif text-2xl font-bold text-ink">Buat akun untuk ikut kompetisi!</h2>
				<p class="mt-1 text-sm text-ink-soft">
					Daftar gratis, selesaikan kuis, dan namamu akan muncul di papan peringkat minggu ini.
				</p>
			</div>
			<div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
				<a href={resolve(`/auth/sign-up?redirectTo=${returnTo}`)} class="btn btn-primary"
					>Daftar sekarang</a
				>
				<a href={resolve(`/auth/sign-in?redirectTo=${returnTo}`)} class="btn btn-ghost">Masuk</a>
			</div>
		</section>
	{:else if board.me}
		<section class="flex flex-col gap-3">
			<h2 class="font-serif text-xl font-bold text-ink">Posisimu</h2>
			<div class="grid grid-cols-3 gap-3 sm:gap-4">
				<StatCard tone="coral" value="#{board.me.rank}" label="Peringkat" />
				<StatCard tone="navy" value={board.me.quizzes} label="Kuis" />
				<StatCard tone="jade" value={board.me.correct} label="Benar" />
			</div>
		</section>
	{:else}
		<section class="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:p-7">
			<div class="flex-1">
				<h2 class="font-serif text-xl font-bold text-ink">
					Kamu belum menyelesaikan kuis minggu ini
				</h2>
				<p class="mt-1 text-sm text-ink-soft">Selesaikan satu kuis untuk masuk peringkat.</p>
			</div>
			<a href={resolve('/quiz')} class="btn btn-primary w-full sm:w-auto">
				Mulai Kuis
				<ArrowRightOutline class="h-5 w-5" />
			</a>
		</section>
	{/if}

	{#if board.entries.length === 0}
		<div class="card flex flex-col items-center gap-3 px-6 py-16 text-center">
			<p lang="ko" class="font-serif text-4xl font-bold text-ink">아직 아무도 없어요</p>
			<p class="text-ink-muted">
				Belum ada yang menyelesaikan kuis minggu ini. Jadilah yang pertama!
			</p>
			<a href={resolve('/quiz')} class="btn btn-primary mt-3">
				Mulai Kuis
				<ArrowRightOutline class="h-5 w-5" />
			</a>
		</div>
	{:else}
		<section class="card overflow-hidden">
			<h2 class="border-b border-paper-3 px-4 py-4 font-serif text-xl font-bold text-ink sm:px-6">
				Peringkat Minggu Ini
			</h2>
			<table class="w-full text-left text-sm">
				<thead class="bg-paper-2/60 text-ink-muted">
					<tr>
						<th scope="col" class="py-3 pr-2 pl-4 font-semibold sm:pl-6">#</th>
						<th scope="col" class="px-2 py-3 font-semibold">Nama</th>
						<th scope="col" class="px-2 py-3 text-center font-semibold sm:px-3">Kuis</th>
						<th scope="col" class="px-2 py-3 text-center font-semibold sm:px-3">Benar</th>
						<th scope="col" class="hidden py-3 pr-6 pl-3 text-right font-semibold sm:table-cell"
							>Akurasi</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-paper-3">
					<!-- No ids reach the browser, and equal names can share a rank: key by position. -->
					{#each board.entries as entry, index (index)}
						{@render row(entry)}
					{/each}
					{#if pinnedMe}
						<tr aria-hidden="true">
							<td colspan="5" class="py-1 text-center tracking-[0.3em] text-ink-muted">···</td>
						</tr>
						{@render row(pinnedMe)}
					{/if}
				</tbody>
			</table>
			<p class="border-t border-paper-3 px-4 py-3 text-xs text-ink-muted sm:px-6">
				Diurutkan dari jumlah kuis yang diselesaikan minggu ini. Jika sama, yang jawaban benarnya
				lebih banyak berada di atas.
			</p>
		</section>
	{/if}
</div>
