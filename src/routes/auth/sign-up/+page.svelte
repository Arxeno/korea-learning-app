<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { Button, Helper, Input, Label } from 'flowbite-svelte';
	import AuthCard from '$lib/components/AuthCard.svelte';

	let { data, form } = $props();

	let submitting = $state(false);
</script>

<svelte:head>
	<title>Daftar - Hangul Learning</title>
</svelte:head>

<AuthCard
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
			<Label for="name" class="mb-2">Nama</Label>
			<Input
				id="name"
				name="name"
				type="text"
				autocomplete="name"
				placeholder="Nama kamu"
				class="placeholder:text-gray-400"
				value={form?.name ?? ''}
				required
			/>
		</div>

		<div>
			<Label for="email" class="mb-2">Email</Label>
			<Input
				id="email"
				name="email"
				type="email"
				autocomplete="email"
				placeholder="nama@email.com"
				class="placeholder:text-gray-400"
				value={form?.email ?? ''}
				required
			/>
		</div>

		<div>
			<Label for="password" class="mb-2">Kata sandi</Label>
			<Input
				id="password"
				name="password"
				type="password"
				autocomplete="new-password"
				minlength={8}
				maxlength={128}
				aria-describedby="password-help"
				required
			/>
			<Helper id="password-help" class="mt-1">Minimal 8 karakter.</Helper>
		</div>

		<div>
			<Label for="confirmPassword" class="mb-2">Konfirmasi kata sandi</Label>
			<Input
				id="confirmPassword"
				name="confirmPassword"
				type="password"
				autocomplete="new-password"
				minlength={8}
				maxlength={128}
				required
			/>
		</div>

		<Button type="submit" color="purple" class="w-full" disabled={submitting}>
			{submitting ? 'Memproses…' : 'Daftar'}
		</Button>
	</form>

	{#snippet footer()}
		Sudah punya akun?
		<a href={resolve('/auth/sign-in')} class="font-medium text-purple-600 hover:underline">
			Masuk
		</a>
	{/snippet}
</AuthCard>
