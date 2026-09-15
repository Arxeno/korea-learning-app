<script lang="ts">
	import './+layout.css';
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

<div class="flex min-h-screen flex-col justify-between">
	<Navbar class="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
		<NavBrand href={resolve('/')}>
			<span class="self-center text-xl font-bold whitespace-nowrap text-white">Hangul Learning</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl {activeUrl}>
			{#each links as link (link.href)}
				<NavLi href={link.href} class="md:hover:text-[#6D3189]/80 {activeUrl === link.href ? 'text-white md:text-[#6D3189]' : 'text-black md:text-white'} md:bg-[#d0c4df] md:hover:bg-[#DCABDF] md:rounded-full md:mx-2 md:w-[100px] md:text-center">
					{link.label}</NavLi
				>
			{/each}
		</NavUl>
	</Navbar>

	<main class="mx-auto w-full max-w-[1200px] px-4 py-8">
		{@render children()}
	</main>

	<footer
		class="mt-auto border-t border-gray-200 bg-gray-50 py-6 text-center text-sm text-gray-500"
	>
		<p>Made with ❤️ by Raisyam, for my Tifa🫶</p>
	</footer>
</div>
