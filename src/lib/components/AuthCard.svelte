<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		/** Small serif Korean line above the title, e.g. "로그인". */
		eyebrow?: string;
		subtitle?: string;
		/** Error shown above the form. */
		error?: string | null;
		/** Success or info message shown above the form. */
		notice?: string | null;
		children: Snippet;
		footer?: Snippet;
	}

	let { title, eyebrow, subtitle, error, notice, children, footer }: Props = $props();
</script>

<div class="flex justify-center sm:py-4">
	<section class="card w-full max-w-md p-6 sm:p-8">
		{#if eyebrow}
			<p lang="ko" class="font-serif text-base font-bold text-coral-600">{eyebrow}</p>
		{/if}
		<h1 class="font-serif text-3xl font-bold text-ink">{title}</h1>
		{#if subtitle}
			<p class="mt-2 text-sm text-ink-muted">{subtitle}</p>
		{/if}

		{#if error}
			<p class="alert-error mt-5" role="alert">{error}</p>
		{/if}
		{#if notice}
			<p class="alert-success mt-5" role="status">{notice}</p>
		{/if}

		<div class="mt-6">
			{@render children()}
		</div>

		{#if footer}
			<div class="mt-6 border-t border-paper-3 pt-5 text-center text-sm text-ink-muted">
				{@render footer()}
			</div>
		{/if}
	</section>
</div>
