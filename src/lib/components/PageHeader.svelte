<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ResolvedPathname } from '$app/types';
	import { ArrowLeftOutline } from 'flowbite-svelte-icons';

	let {
		title,
		eyebrow,
		subtitle,
		back,
		size = 'lg',
		titleLang,
		children
	}: {
		title: string;
		/** Small serif line above the title, usually the Korean name of the page. */
		eyebrow?: string;
		subtitle?: string;
		back?: { href: ResolvedPathname; label: string };
		size?: 'lg' | 'md';
		titleLang?: string;
		children?: Snippet;
	} = $props();
</script>

<header class="flex flex-col gap-1.5">
	{#if back}
		<a
			href={back.href}
			class="mb-2 inline-flex w-fit items-center gap-1.5 rounded-lg text-sm font-medium text-ink-muted transition hover:text-ink"
		>
			<ArrowLeftOutline class="h-4 w-4" />
			{back.label}
		</a>
	{/if}
	{#if eyebrow}
		<p class="font-serif text-base font-bold text-coral-600">{eyebrow}</p>
	{/if}
	<h1
		lang={titleLang}
		class="font-serif font-bold tracking-tight text-balance text-ink {size === 'lg'
			? 'text-4xl sm:text-5xl'
			: 'text-3xl sm:text-4xl'}"
	>
		{title}
	</h1>
	{#if subtitle}
		<p class="mt-1 max-w-2xl text-ink-muted">{subtitle}</p>
	{/if}
	{@render children?.()}
</header>
