<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { Button, Input, Label } from 'flowbite-svelte';
	import AuthCard from '$lib/components/AuthCard.svelte';

	let { form } = $props();

	let submitting = $state(false);
</script>

<svelte:head>
	<title>Lupa Kata Sandi - Hangul Learning</title>
</svelte:head>

<AuthCard
	title="Lupa kata sandi"
	subtitle="Masukkan email akunmu. Kami akan mengirim tautan untuk membuat kata sandi baru."
	error={form && 'message' in form ? form.message : null}
	notice={form && 'sent' in form
		? `Jika ${form.email} terdaftar, tautan untuk mengatur ulang kata sandi sudah dikirim. Periksa kotak masuk (dan folder spam) emailmu. Tautan berlaku 1 jam.`
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

		<Button type="submit" color="purple" class="w-full" disabled={submitting}>
			{submitting ? 'Mengirim…' : 'Kirim tautan atur ulang'}
		</Button>
	</form>

	{#snippet footer()}
		Ingat kata sandimu?
		<a href={resolve('/auth/sign-in')} class="font-medium text-purple-600 hover:underline">
			Masuk
		</a>
	{/snippet}
</AuthCard>
