<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { Button, Input, Label } from 'flowbite-svelte';
	import AuthCard from '$lib/components/AuthCard.svelte';

	let { data, form } = $props();

	let submitting = $state(false);
</script>

<svelte:head>
	<title>Masuk - Hangul Learning</title>
</svelte:head>

<AuthCard
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
			<div class="mb-2 flex items-center justify-between">
				<Label for="password">Kata sandi</Label>
				<a
					href={resolve('/auth/forgot-password')}
					class="text-sm font-medium text-purple-600 hover:underline"
				>
					Lupa kata sandi?
				</a>
			</div>
			<Input
				id="password"
				name="password"
				type="password"
				autocomplete="current-password"
				required
			/>
		</div>

		<Button type="submit" color="purple" class="w-full" disabled={submitting}>
			{submitting ? 'Memproses…' : 'Masuk'}
		</Button>
	</form>

	{#snippet footer()}
		Belum punya akun?
		<a href={resolve('/auth/sign-up')} class="font-medium text-purple-600 hover:underline">
			Daftar
		</a>
	{/snippet}
</AuthCard>
