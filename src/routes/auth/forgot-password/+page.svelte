<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import AuthCard from '$lib/components/AuthCard.svelte';

	let { form } = $props();

	let submitting = $state(false);
</script>

<svelte:head>
	<title>Lupa Kata Sandi - Hangul Learning</title>
</svelte:head>

<AuthCard
	eyebrow="비밀번호 찾기"
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

		<button type="submit" class="btn btn-primary w-full" disabled={submitting}>
			{submitting ? 'Mengirim…' : 'Kirim tautan atur ulang'}
		</button>
	</form>

	{#snippet footer()}
		Ingat kata sandimu?
		<a href={resolve('/auth/sign-in')} class="link">Masuk</a>
	{/snippet}
</AuthCard>
