<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { ArrowRightToBracketOutline } from 'flowbite-svelte-icons';
	import { links, isActive } from '$lib/nav';
	import BrandSeal from './BrandSeal.svelte';

	let { user }: { user: { name: string; email: string } | null } = $props();

	const home = $derived(resolve('/'));
	// The account link also stays highlighted on the /auth/* pages (sign in, sign up, reset).
	const accountActive = $derived(
		isActive(page.url.pathname, resolve('/account'), home) || page.url.pathname.includes('/auth/')
	);
	// First character of the name (or email), spread so Hangul or emoji stay whole.
	const initial = $derived(user ? ([...user.name.trim()][0] ?? user.email[0]).toUpperCase() : '');
</script>

<header class="sticky top-0 z-30 border-b border-paper-3/80 bg-paper/85 backdrop-blur-md">
	<div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
		<a href={home} class="flex items-center gap-3 rounded-xl">
			<BrandSeal />
			<span class="flex flex-col leading-none">
				<span class="font-serif text-xl font-bold text-ink">Hangul Learning</span>
				<span class="mt-1 text-[11px] tracking-[0.25em] text-ink-muted">한글 공부</span>
			</span>
		</a>

		<div class="flex items-center gap-3">
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

			<span aria-hidden="true" class="hidden h-6 w-px bg-paper-3 md:block"></span>

			{#if user}
				<a
					href={resolve('/account')}
					aria-current={accountActive ? 'page' : undefined}
					title={user.email}
					class="flex items-center gap-2 rounded-full py-1 pr-1 text-sm font-medium transition sm:pr-3 sm:pl-1 {accountActive
						? 'bg-ink text-paper shadow-soft'
						: 'text-ink-soft hover:bg-paper-2 hover:text-ink'}"
				>
					<span
						aria-hidden="true"
						class="grid h-8 w-8 place-items-center rounded-full font-serif text-sm font-bold {accountActive
							? 'bg-coral-500 text-paper'
							: 'bg-ink text-paper'}">{initial}</span
					>
					<span class="sr-only sm:not-sr-only">Akun</span>
				</a>
			{:else}
				<a
					href={resolve('/auth/sign-in')}
					aria-current={accountActive ? 'page' : undefined}
					class="btn btn-sm {accountActive ? 'btn-primary' : 'btn-ghost'}"
				>
					<ArrowRightToBracketOutline class="h-4 w-4" />
					Masuk
				</a>
			{/if}
		</div>
	</div>
</header>
