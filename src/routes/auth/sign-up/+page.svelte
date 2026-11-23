<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import AuthCard from '$lib/components/AuthCard.svelte';

	let { data, form } = $props();

	let submitting = $state(false);
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
			return async ({ update }) => {
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

		<button type="submit" class="btn btn-primary w-full" disabled={submitting}>
			{submitting ? 'Memproses…' : 'Daftar'}
		</button>
	</form>

	{#snippet footer()}
		Sudah punya akun?
		<a href={resolve('/auth/sign-in')} class="link">Masuk</a>
	{/snippet}
</AuthCard>
