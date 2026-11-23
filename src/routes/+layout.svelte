<script lang="ts">
	import './+layout.css';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import { Alert, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { syncStatus } from '$lib/stores.svelte';

	let { children, data } = $props();

	let activeUrl = $derived(page.url.pathname);

	// Set by the sign-up action after moving guest progress into the new account.
	const progressImport = $derived(page.url.searchParams.get('progress'));

	const baseLinks = [
		{ href: resolve('/'), label: 'Beranda' },
		{ href: resolve('/vocabulary'), label: 'Kosa Kata' },
		{ href: resolve('/quiz'), label: 'Kuis' },
		{ href: resolve('/practice'), label: 'Latihan' },
		{ href: resolve('/scores'), label: 'Skor' }
	];

	let links = $derived([
		...baseLinks,
		data.user
			? { href: resolve('/account'), label: 'Akun' }
			: { href: resolve('/auth/sign-in'), label: 'Masuk' }
	]);

	// Sub-pages (e.g. /practice/numbers) keep their section highlighted.
	const isActive = (href: string) =>
		activeUrl === href || (href !== resolve('/') && activeUrl.startsWith(`${href}/`));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col justify-between">
	<Navbar class="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
		<NavBrand href={resolve('/')}>
			<span class="self-center text-xl font-bold whitespace-nowrap text-white">Hangul Learning</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl {activeUrl}>
			{#each links as link (link.href)}
				<NavLi
					href={link.href}
					class="md:hover:text-[#6D3189]/80 {isActive(link.href)
						? 'text-white md:text-[#6D3189]'
						: 'text-black md:text-white'} md:mx-2 md:w-[100px] md:rounded-full md:bg-[#d0c4df] md:text-center md:hover:bg-[#DCABDF]"
				>
					{link.label}</NavLi
				>
			{/each}
		</NavUl>
	</Navbar>

	<main class="mx-auto w-full max-w-[1200px] px-4 py-8">
		{#if progressImport === 'saved'}
			<Alert color="green" dismissable class="mb-6" role="status">
				Progress-mu sudah tersimpan di akun. Sekarang bisa dilanjutkan dari perangkat mana pun.
			</Alert>
		{:else if progressImport === 'failed'}
			<Alert color="yellow" dismissable class="mb-6" role="alert">
				Akunmu sudah dibuat, tapi progress lama gagal dipindahkan. Progress itu masih ada di
				perangkat ini.
			</Alert>
		{/if}
		{#if syncStatus.failed}
			<Alert color="red" dismissable class="mb-6" role="alert">
				Progress gagal disimpan ke akun. Periksa koneksi internetmu.
			</Alert>
		{/if}
		{@render children()}
	</main>

	<footer
		class="mt-auto border-t border-gray-200 bg-gray-50 py-6 text-center text-sm text-gray-500"
	>
		<p>Made with ❤️ by Raisyam, for my Tifa🫶</p>
	</footer>
</div>
