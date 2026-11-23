<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { CloseOutline, CloudArrowUpOutline } from 'flowbite-svelte-icons';
	import { snooze } from '$lib/registerPrompt';

	interface Props {
		open: boolean;
		/** `announce`: the one-time "new feature" notice; `after-quiz`: shown on the quiz results. */
		variant: 'announce' | 'after-quiz';
		quizCount?: number;
		wordCount?: number;
		/** Where sign-up or sign-in returns to. */
		redirectTo?: string;
	}

	let {
		open = $bindable(false),
		variant,
		quizCount = 0,
		wordCount = 0,
		redirectTo = '/'
	}: Props = $props();

	let dialog = $state<HTMLDialogElement>();

	const returnTo = $derived(encodeURIComponent(redirectTo));

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		else if (!open && dialog.open) dialog.close();
	});

	// Leaving the page (e.g. via "Daftar sekarang") just closes it; that is not a dismissal.
	beforeNavigate(() => {
		open = false;
	});

	/** "Nanti saja", the close button, Escape and a click on the backdrop all snooze the invite. */
	function dismiss() {
		snooze();
		open = false;
	}
</script>

<dialog
	bind:this={dialog}
	aria-labelledby="register-prompt-title"
	class="card m-auto w-[calc(100%-2rem)] max-w-sm overflow-visible p-0 text-ink backdrop:bg-ink/40 backdrop:backdrop-blur-sm open:animate-rise"
	onclose={() => (open = false)}
	oncancel={(event) => {
		event.preventDefault();
		dismiss();
	}}
	onclick={(event) => {
		// The dialog element itself is only hit outside the content: on the backdrop.
		if (event.target === dialog) dismiss();
	}}
>
	<div class="relative flex flex-col items-center gap-4 p-6 text-center sm:p-8">
		<button
			type="button"
			class="absolute top-3 right-3 grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-ink-muted transition hover:bg-paper-2 hover:text-ink"
			aria-label="Tutup"
			onclick={dismiss}
		>
			<CloseOutline class="h-5 w-5" />
		</button>

		<span
			class="grid h-14 w-14 place-items-center rounded-2xl bg-jade-50 text-jade-600 ring-1 ring-jade-100"
		>
			<CloudArrowUpOutline class="h-7 w-7" />
		</span>

		{#if variant === 'announce'}
			<span class="stamp"><span lang="ko">새 기능</span>&nbsp;· Baru</span>
			<h2 id="register-prompt-title" class="font-serif text-2xl font-bold text-ink">
				Simpan progress ke akun
			</h2>
			<p class="text-sm text-ink-soft">
				Daftar gratis supaya riwayat kuis dan kata yang sudah kamu pelajari tersimpan di cloud dan
				bisa dilanjutkan di HP atau laptop lain.
			</p>
		{:else}
			<h2 id="register-prompt-title" class="font-serif text-2xl font-bold text-ink">
				Progress-mu baru tersimpan di perangkat ini
			</h2>
			<p class="text-sm text-ink-soft">
				Kamu sudah menyelesaikan <strong class="text-ink">{quizCount} kuis</strong> dan berlatih
				<strong class="text-ink">{wordCount} kata</strong>. Daftar gratis supaya semuanya tersimpan
				di cloud dan tidak hilang saat ganti perangkat atau menghapus data browser.
			</p>
		{/if}

		<div class="mt-2 flex w-full flex-col gap-2">
			<a href={resolve(`/auth/sign-up?redirectTo=${returnTo}`)} class="btn btn-primary w-full"
				>Daftar sekarang</a
			>
			<button type="button" class="btn btn-ghost w-full" onclick={dismiss}>Nanti saja</button>
		</div>

		<p class="text-sm text-ink-muted">
			Sudah punya akun?
			<a href={resolve(`/auth/sign-in?redirectTo=${returnTo}`)} class="link">Masuk</a>
		</p>
	</div>
</dialog>
