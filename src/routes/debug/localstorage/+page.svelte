<script lang="ts">
	let raw = $state<Record<string, string | null>>({});
	let parsed = $state<Record<string, unknown>>({});

	$effect(() => {
		if (typeof window === 'undefined') return;
		const r: Record<string, string | null> = {};
		const p: Record<string, unknown> = {};
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key === null) continue;
			const value = localStorage.getItem(key);
			r[key] = value;
			if (value === null) {
				p[key] = null;
				continue;
			}
			try {
				p[key] = JSON.parse(value);
			} catch {
				p[key] = value;
			}
		}
		raw = r;
		parsed = p;
	});

	let output = $derived(JSON.stringify(parsed, null, 2));

	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		try {
			await navigator.clipboard.writeText(output);
		} catch {
			// ponytail: clipboard API needs secure context; fallback covers plain http:// LAN dev
			const ta = document.createElement('textarea');
			ta.value = output;
			ta.style.position = 'fixed';
			ta.style.opacity = '0';
			document.body.appendChild(ta);
			ta.select();
			document.execCommand('copy');
			ta.remove();
		}
		copied = true;
		clearTimeout(copyTimer);
		copyTimer = setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	<title>Debug localStorage - Hangul Learning</title>
</svelte:head>

<div class="mb-2 flex items-center justify-between">
	<h1 class="text-lg font-bold text-gray-900">localStorage dump</h1>
	<button
		onclick={copy}
		disabled={Object.keys(raw).length === 0}
		class="rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
	>
		{copied ? 'Copied!' : 'Copy JSON'}
	</button>
</div>

<pre
	class="overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-gray-100">{output}</pre>

<!-- ponytail: raw always kept for values that fail JSON.parse; upgrade to per-key accordion/copy buttons when page grows -->
{#if Object.keys(raw).length === 0}
	<p class="mt-2 text-sm text-gray-500">localStorage is empty.</p>
{/if}
