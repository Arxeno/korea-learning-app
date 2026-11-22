<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { links, isActive } from '$lib/nav';
	import BrandSeal from './BrandSeal.svelte';

	const home = $derived(resolve('/'));
</script>

<header class="sticky top-0 z-30 border-b border-paper-3/80 bg-paper/85 backdrop-blur-md">
	<div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
		<a href={home} class="flex items-center gap-3 rounded-xl">
			<BrandSeal />
			<span class="flex flex-col leading-none">
				<span class="font-serif text-xl font-bold text-ink">Hangul Learning</span>
				<span class="mt-1 text-[11px] tracking-[0.25em] text-ink-muted">한글 공부</span>
			</span>
		</a>

		<nav aria-label="Navigasi utama" class="hidden md:block">
			<ul class="flex items-center gap-1">
				{#each links as link (link.route)}
					{@const href = resolve(link.route)}
					{@const active = isActive(page.url.pathname, href, home)}
					<li>
						<a
							{href}
							aria-current={active ? 'page' : undefined}
							class="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition {active
								? 'bg-ink text-paper shadow-soft'
								: 'text-ink-soft hover:bg-paper-2 hover:text-ink'}"
						>
							<span
								lang="ko"
								class="hidden font-serif text-xs lg:inline {active
									? 'text-coral-200'
									: 'text-coral-600'}">{link.ko}</span
							>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>
