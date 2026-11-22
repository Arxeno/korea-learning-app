<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Alert, Card } from 'flowbite-svelte';

	interface Props {
		title: string;
		subtitle?: string;
		/** Error shown above the form. */
		error?: string | null;
		/** Success or info message shown above the form. */
		notice?: string | null;
		children: Snippet;
		footer?: Snippet;
	}

	let { title, subtitle, error, notice, children, footer }: Props = $props();
</script>

<div class="flex justify-center py-4 sm:py-8">
	<Card size="md" class="w-full p-6 sm:p-8">
		<h1 class="text-2xl font-bold text-gray-900">{title}</h1>
		{#if subtitle}
			<p class="mt-1 text-sm text-gray-500">{subtitle}</p>
		{/if}

		{#if error}
			<Alert color="red" class="mt-4" role="alert">{error}</Alert>
		{/if}
		{#if notice}
			<Alert color="green" class="mt-4" role="status">{notice}</Alert>
		{/if}

		<div class="mt-6">
			{@render children()}
		</div>

		{#if footer}
			<div class="mt-6 border-t border-gray-100 pt-4 text-center text-sm text-gray-600">
				{@render footer()}
			</div>
		{/if}
	</Card>
</div>
