<script lang="ts">
	import './+layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import MobileTabBar from '$lib/components/MobileTabBar.svelte';
	import BrandSeal from '$lib/components/BrandSeal.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<SiteHeader />

	<main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12 [&>*]:animate-rise">
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
