<script lang="ts" module>
	export type Tone = 'ink' | 'jade' | 'coral' | 'gold' | 'navy';
</script>

<script lang="ts">
	let {
		value,
		label,
		tone = 'ink',
		flat = false
	}: {
		value: string | number;
		label: string;
		tone?: Tone;
		/** Borderless variant for use inside another card. */
		flat?: boolean;
	} = $props();

	const tones: Record<Tone, { text: string; bar: string }> = {
		ink: { text: 'text-ink', bar: 'bg-ink' },
		jade: { text: 'text-jade-600', bar: 'bg-jade-500' },
		coral: { text: 'text-coral-600', bar: 'bg-coral-500' },
		gold: { text: 'text-gold-600', bar: 'bg-gold-500' },
		navy: { text: 'text-navy-600', bar: 'bg-navy-500' }
	};
</script>

<div
	class="flex flex-col gap-1 {flat ? 'rounded-xl bg-paper-2/70 px-3 py-4 text-center' : 'card p-5'}"
>
	{#if !flat}
		<span class="mb-2 h-1 w-8 rounded-full {tones[tone].bar}"></span>
	{/if}
	<span class="font-serif text-3xl font-bold {tones[tone].text}">{value}</span>
	<span class="text-sm text-ink-muted">{label}</span>
</div>
