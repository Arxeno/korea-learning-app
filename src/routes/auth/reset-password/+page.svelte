<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
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
		eyebrow="비밀번호 재설정"
		title="Tautan tidak valid"
		error="Tautan atur ulang kata sandi tidak valid, sudah dipakai, atau sudah kedaluwarsa."
	>
		<a href={resolve('/auth/forgot-password')} class="btn btn-primary w-full">
			Minta tautan baru
		</a>

		{#snippet footer()}
			<a href={resolve('/auth/sign-in')} class="link">Kembali ke halaman masuk</a>
		{/snippet}
	</AuthCard>
{:else}
	<AuthCard
		eyebrow="비밀번호 재설정"
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
				<label for="password" class="label">Kata sandi baru</label>
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
				<label for="confirmPassword" class="label">Konfirmasi kata sandi baru</label>
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
				{submitting ? 'Menyimpan…' : 'Simpan kata sandi baru'}
			</button>
		</form>
	</AuthCard>
{/if}
