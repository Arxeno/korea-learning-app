<script lang="ts">
	import { resolve } from '$app/paths';
	import { clearGuestProgress } from '$lib/stores.svelte';

	let { data } = $props();

	const joined = $derived(
		new Date(data.account.createdAt).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);
	// First character of the name (or email), spread so Hangul or emoji stay whole.
	const initial = $derived(
		([...data.account.name.trim()][0] ?? data.account.email[0]).toUpperCase()
	);
</script>

<svelte:head>
	<title>Akun - Hangul Learning</title>
</svelte:head>

<div class="flex justify-center sm:py-4">
	<section class="card w-full max-w-md p-6 sm:p-8">
		<p lang="ko" class="font-serif text-base font-bold text-coral-600">내 계정</p>
		<div class="mt-4 flex items-center gap-4">
			<span
				aria-hidden="true"
				class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-ink font-serif text-3xl font-bold text-paper shadow-soft"
				>{initial}</span
			>
			<div class="min-w-0">
				<h1 class="truncate font-serif text-3xl font-bold text-ink">{data.account.name}</h1>
				<p class="truncate text-sm text-ink-muted">{data.account.email}</p>
			</div>
		</div>

		<p class="mt-6 rounded-xl bg-paper-2 px-4 py-3 text-sm text-ink-soft">
			Bergabung sejak <span class="font-semibold text-ink">{joined}</span>
		</p>

		<div class="mt-6 flex flex-col gap-3 border-t border-paper-3 pt-6 sm:flex-row">
			<a href={resolve('/auth/forgot-password')} class="btn btn-ghost flex-1">Ubah kata sandi</a>
			<!-- Signing out also empties this browser's progress, so the next person starts fresh. -->
			<form
				method="POST"
				action={resolve('/auth/sign-out')}
				class="flex-1"
				onsubmit={clearGuestProgress}
			>
				<button
					type="submit"
					class="btn w-full border border-coral-200 bg-surface text-coral-600 hover:border-coral-500 hover:bg-coral-50"
				>
					Keluar
				</button>
			</form>
		</div>
	</section>
</div>
