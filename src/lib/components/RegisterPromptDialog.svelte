<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';
	import { Badge, Button, Modal } from 'flowbite-svelte';
	import { CloudArrowUpSolid } from 'flowbite-svelte-icons';
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

	// resolve() has no query-string support; appending one still yields a resolved app path.
	const query = $derived(`?redirectTo=${encodeURIComponent(redirectTo)}`);
	const signUpHref = $derived((resolve('/auth/sign-up') + query) as ResolvedPathname);
	const signInHref = $derived((resolve('/auth/sign-in') + query) as ResolvedPathname);

	// flowbite's Modal stays open on top of the next page if the page is left while it is open
	// (e.g. via "Daftar sekarang"), blocking that page. Close it first.
	beforeNavigate(() => {
		open = false;
	});

	function later() {
		snooze();
		open = false;
	}
</script>

<!-- Closing with X, Escape or a click outside counts as "Nanti saja" too. -->
<Modal bind:open size="xs" oncancel={snooze} aria-labelledby="register-prompt-title">
	<div class="flex flex-col items-center gap-4 pt-2 text-center">
		<div class="grid h-14 w-14 place-items-center rounded-full bg-purple-100">
			<CloudArrowUpSolid class="h-8 w-8 text-purple-600" />
		</div>

		{#if variant === 'announce'}
			<Badge color="purple" rounded>Baru</Badge>
			<h3 id="register-prompt-title" class="text-xl font-bold text-gray-900">
				Simpan progress ke akun
			</h3>
			<p class="text-sm text-gray-600">
				Daftar gratis supaya riwayat kuis dan kata yang sudah kamu pelajari tersimpan di cloud dan
				bisa dilanjutkan di HP atau laptop lain.
			</p>
		{:else}
			<h3 id="register-prompt-title" class="text-xl font-bold text-gray-900">
				Progress-mu baru tersimpan di perangkat ini
			</h3>
			<p class="text-sm text-gray-600">
				Kamu sudah menyelesaikan <strong>{quizCount} kuis</strong> dan berlatih
				<strong>{wordCount} kata</strong>. Daftar gratis supaya semuanya tersimpan di cloud dan
				tidak hilang saat ganti perangkat atau menghapus data browser.
			</p>
		{/if}

		<div class="flex w-full flex-col gap-2">
			<Button href={signUpHref} color="purple" class="w-full">Daftar sekarang</Button>
			<Button color="light" class="w-full" onclick={later}>Nanti saja</Button>
		</div>

		<p class="text-sm text-gray-500">
			Sudah punya akun?
			<a href={signInHref} class="font-medium text-purple-600 hover:underline"> Masuk </a>
		</p>
	</div>
</Modal>
