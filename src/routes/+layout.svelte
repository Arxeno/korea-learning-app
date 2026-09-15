<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { children } = $props();

	const links = [
		{ href: resolve('/'), label: 'Beranda' },
		{ href: resolve('/vocabulary'), label: 'Kosa Kata' },
		{ href: resolve('/quiz'), label: 'Kuis' },
		{ href: resolve('/scores'), label: 'Skor' }
	];
</script>

<nav class="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg">
	<div class="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
		<a href={resolve('/')} class="text-xl font-bold tracking-tight">Hangul Learning</a>
		<div class="flex gap-1">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-full px-3 py-1 text-sm font-medium transition-colors {page.url.pathname ===
					link.href
						? 'bg-white/25'
						: 'hover:bg-white/15'}"
				>
					{link.label}
				</a>
			{/each}
		</div>
	</div>
</nav>

<main class="mx-auto max-w-4xl px-4 py-8">
	{@render children()}
</main>

<footer class="mt-auto border-t border-gray-200 bg-gray-50 py-6 text-center text-sm text-gray-500">
	<p>Hangul Learning App &copy; 2026</p>
</footer>
