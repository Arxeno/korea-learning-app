<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { Button, Helper, Input, Label } from 'flowbite-svelte';
	import AuthCard from '$lib/components/AuthCard.svelte';

	let { data, form } = $props();

	let submitting = $state(false);
	let invalidLink = $derived(!data.token || form?.invalidToken);
</script>

<svelte:head>
	<title>Atur Ulang Kata Sandi - Hangul Learning</title>
</svelte:head>

{#if invalidLink}
	<AuthCard
		title="Tautan tidak valid"
		error="Tautan atur ulang kata sandi tidak valid, sudah dipakai, atau sudah kedaluwarsa."
	>
		<Button href={resolve('/auth/forgot-password')} color="purple" class="w-full">
			Minta tautan baru
		</Button>

		{#snippet footer()}
			<a href={resolve('/auth/sign-in')} class="font-medium text-purple-600 hover:underline">
				Kembali ke halaman masuk
			</a>
		{/snippet}
	</AuthCard>
{:else}
	<AuthCard
		title="Atur ulang kata sandi"
		subtitle="Buat kata sandi baru untuk akunmu."
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
			<input type="hidden" name="token" value={data.token} />

			<div>
				<Label for="password" class="mb-2">Kata sandi baru</Label>
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
				<Label for="confirmPassword" class="mb-2">Konfirmasi kata sandi baru</Label>
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
				{submitting ? 'Menyimpan…' : 'Simpan kata sandi baru'}
			</Button>
		</form>
	</AuthCard>
{/if}
