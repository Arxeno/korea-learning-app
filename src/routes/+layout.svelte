<script lang="ts">
	import './+layout.css';
	import { page } from '$app/state';
	import { CloseOutline } from 'flowbite-svelte-icons';
	import favicon from '$lib/assets/favicon.svg';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import MobileTabBar from '$lib/components/MobileTabBar.svelte';
	import BrandSeal from '$lib/components/BrandSeal.svelte';
	import { syncStatus } from '$lib/stores.svelte';

	let { children, data } = $props();

	// `?progress=saved|failed` is set by the sign-up action after moving guest progress into the account.
	let importNoticeHidden = $state(false);
	const notice = $derived.by(() => {
		if (syncStatus.failed) {
			return {
				style: 'alert-error',
				text: 'Progress gagal disimpan ke akun. Periksa koneksi internetmu.',
				hide: () => (syncStatus.failed = false)
			};
		}
		if (importNoticeHidden) return null;
		const hide = () => (importNoticeHidden = true);
		switch (page.url.searchParams.get('progress')) {
			case 'saved':
				return {
					style: 'alert-success',
					text: 'Progress-mu sudah tersimpan di akun. Sekarang bisa dilanjutkan dari perangkat mana pun.',
					hide
				};
			case 'failed':
				return {
					style: 'alert-warning',
					text: 'Akunmu sudah dibuat, tapi progress lama gagal dipindahkan. Progress itu masih ada di perangkat ini.',
					hide
				};
			default:
				return null;
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<SiteHeader user={data.user} />

	<main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12 [&>*]:animate-rise">
		{#if notice}
			<div
				class="{notice.style} mb-6 flex items-start gap-3"
				role={notice.style === 'alert-success' ? 'status' : 'alert'}
			>
				<p class="flex-1">{notice.text}</p>
				<button
					type="button"
					class="-m-1 cursor-pointer rounded-md p-1 opacity-70 transition hover:opacity-100"
					aria-label="Tutup"
					onclick={notice.hide}
				>
					<CloseOutline class="h-4 w-4" />
				</button>
			</div>
		{/if}
		{@render children()}
	</main>

	<footer
		class="border-t border-paper-3 pt-6 pb-[calc(6rem+env(safe-area-inset-bottom))] text-center text-sm text-ink-muted md:pb-6"
	>
		<p class="flex items-center justify-center gap-2">
			<BrandSeal size="sm" />
			<span>Made with ❤️ by Raisyam, for my Tifa🫶</span>
		</p>
	</footer>
</div>

<MobileTabBar />
