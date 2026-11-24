<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { links, isActive } from '$lib/nav';

	const home = $derived(resolve('/'));
</script>

<nav
	aria-label="Navigasi utama"
	class="fixed inset-x-0 bottom-0 z-30 border-t border-paper-3 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
>
	<ul class="mx-auto grid max-w-md grid-cols-6">
		{#each links as link (link.route)}
			{@const href = resolve(link.route)}
			{@const active = isActive(page.url.pathname, href, home)}
			{@const Icon = link.icon}
			<li>
				<a
					{href}
					aria-current={active ? 'page' : undefined}
					class="flex flex-col items-center gap-0.5 pt-2 pb-1.5 text-[11px] font-medium transition {active
						? 'text-ink'
						: 'text-ink-muted hover:text-ink'}"
				>
					<span
						class="grid h-8 w-12 place-items-center rounded-full transition {active
							? 'bg-ink text-paper'
							: ''}"
					>
						<Icon class="h-5 w-5" />
					</span>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
