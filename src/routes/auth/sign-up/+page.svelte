<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import AuthCard from '$lib/components/AuthCard.svelte';
	import { clearGuestProgress, readGuestProgress, type GuestProgress } from '$lib/stores.svelte';

	let { data, form } = $props();

	let submitting = $state(false);

	// Progress made in this browser without an account, offered for import into the new account.
	let guestProgress = $state<GuestProgress | null>(null);
	onMount(() => {
		guestProgress = readGuestProgress();
	});

	const guestProgressJson = $derived(
		guestProgress
			? JSON.stringify({ results: guestProgress.results, stats: guestProgress.stats })
			: ''
	);
</script>

<svelte:head>
	<title>Daftar - Hangul Learning</title>
</svelte:head>

<AuthCard
	eyebrow="회원가입"
	title="Daftar"
	subtitle="Buat akun untuk mulai belajar bahasa Korea."
	error={form?.message}
>
	<form
		method="POST"
		class="flex flex-col gap-4"
		use:enhance={() => {
			submitting = true;
			return async ({ result, update }) => {
				// The progress is now in the account; drop the browser copy so it isn't imported twice.
				if (result.type === 'redirect' && result.location.includes('progress=saved')) {
					clearGuestProgress();
				}
				await update();
				submitting = false;
			};
		}}
	>
		<input type="hidden" name="redirectTo" value={data.redirectTo} />

		<div>
			<label for="name" class="label">Nama</label>
			<input
				class="input"
				id="name"
				name="name"
				type="text"
				autocomplete="name"
				placeholder="Nama kamu"
				value={form?.name ?? ''}
				required
			/>
		</div>

		<div>
			<label for="email" class="label">Email</label>
			<input
				class="input"
				id="email"
				name="email"
				type="email"
				autocomplete="email"
				placeholder="nama@email.com"
				value={form?.email ?? ''}
				required
			/>
		</div>

		<div>
			<label for="password" class="label">Kata sandi</label>
			<input
				class="input"
				id="password"
				name="password"
				type="password"
				autocomplete="new-password"
				minlength={8}
				maxlength={128}
				aria-describedby="password-help"
				required
			/>
			<p id="password-help" class="mt-1.5 text-xs text-ink-muted">Minimal 8 karakter.</p>
		</div>

		<div>
			<label for="confirmPassword" class="label">Konfirmasi kata sandi</label>
			<input
				class="input"
				id="confirmPassword"
				name="confirmPassword"
				type="password"
				autocomplete="new-password"
				minlength={8}
				maxlength={128}
				required
			/>
		</div>

		{#if guestProgress}
			<label
				class="flex cursor-pointer items-start gap-3 rounded-xl border border-jade-100 bg-jade-50 px-4 py-3"
			>
				<input
					type="checkbox"
					name="importProgress"
					checked
					class="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-jade-600"
				/>
				<span class="text-sm text-ink-soft">
					<span class="font-semibold text-ink">
						Simpan progress yang sudah ada ({guestProgress.quizCount} kuis, {guestProgress.wordCount}
						kata) ke akunmu
					</span>
					<span class="mt-0.5 block text-ink-muted"
						>Supaya bisa dilanjutkan di HP atau laptop lain.</span
					>
				</span>
			</label>
			<input type="hidden" name="guestProgress" value={guestProgressJson} />
		{/if}

		<button type="submit" class="btn btn-primary w-full" disabled={submitting}>
			{submitting ? 'Memproses…' : 'Daftar'}
		</button>
	</form>

	{#snippet footer()}
		Sudah punya akun?
		<a href={resolve('/auth/sign-in')} class="link">Masuk</a>
	{/snippet}
</AuthCard>
