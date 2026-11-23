<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import AuthCard from '$lib/components/AuthCard.svelte';
	import { readGuestProgress } from '$lib/stores.svelte';

	let { data, form } = $props();

	let submitting = $state(false);

	// Signing in to an existing account does not import guest progress; say so up front.
	let hasGuestProgress = $state(false);
	onMount(() => {
		hasGuestProgress = readGuestProgress() !== null;
	});
</script>

<svelte:head>
	<title>Masuk - Hangul Learning</title>
</svelte:head>

<AuthCard
	eyebrow="로그인"
	title="Masuk"
	subtitle="Masuk ke akun Hangul Learning-mu."
	error={form?.message}
	notice={data.resetSuccess && !form
		? 'Kata sandi berhasil diubah. Silakan masuk dengan kata sandi baru.'
		: null}
>
	<form
		method="POST"
		class="flex flex-col gap-4"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		<input type="hidden" name="redirectTo" value={data.redirectTo} />

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
			<div class="mb-2 flex items-center justify-between">
				<label for="password" class="label mb-0">Kata sandi</label>
				<a href={resolve('/auth/forgot-password')} class="link text-sm">Lupa kata sandi?</a>
			</div>
			<input
				class="input"
				id="password"
				name="password"
				type="password"
				autocomplete="current-password"
				required
			/>
		</div>

		{#if hasGuestProgress}
			<p class="alert-warning">
				Progress tanpa akun di perangkat ini tidak dipindah ke akunmu dan akan terhapus saat kamu
				keluar. Belum punya akun?
				<a href={resolve('/auth/sign-up')} class="font-semibold underline underline-offset-2"
					>Daftar</a
				> untuk menyimpannya.
			</p>
		{/if}

		<button type="submit" class="btn btn-primary w-full" disabled={submitting}>
			{submitting ? 'Memproses…' : 'Masuk'}
		</button>
	</form>

	{#snippet footer()}
		Belum punya akun?
		<a href={resolve('/auth/sign-up')} class="link">Daftar</a>
	{/snippet}
</AuthCard>
