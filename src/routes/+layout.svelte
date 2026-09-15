<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

	let { children } = $props();

	let activeUrl = $derived(page.url.pathname);

	const links = [
		{ href: resolve('/'), label: 'Beranda' },
		{ href: resolve('/vocabulary'), label: 'Kosa Kata' },
		{ href: resolve('/quiz'), label: 'Kuis' },
		{ href: resolve('/scores'), label: 'Skor' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar class="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
	<NavBrand href={resolve('/')}>
		<span class="self-center text-xl font-bold whitespace-nowrap text-white">Hangul Learning</span>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		{#each links as link (link.href)}
			<NavLi href={link.href} class="text-white hover:text-white/80">{link.label}</NavLi>
		{/each}
	</NavUl>
</Navbar>

<main class="mx-auto max-w-4xl px-4 py-8">
	{@render children()}
</main>

<footer class="mt-auto border-t border-gray-200 bg-gray-50 py-6 text-center text-sm text-gray-500">
	<p>Hangul Learning App &copy; 2026</p>
</footer>
