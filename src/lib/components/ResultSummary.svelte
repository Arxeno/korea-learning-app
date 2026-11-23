<script lang="ts">
	import type { ResolvedPathname } from '$app/types';
	import { RefreshOutline } from 'flowbite-svelte-icons';
	import StatCard from './StatCard.svelte';

	let {
		correct,
		total,
		title,
		onrestart,
		secondary
	}: {
		correct: number;
		total: number;
		title: string;
		onrestart: () => void;
		secondary: { href: ResolvedPathname; label: string };
	} = $props();

	const R = 52;
	const C = 2 * Math.PI * R;

	const pct = $derived(total === 0 ? 0 : Math.round((correct / total) * 100));
	const mood = $derived(
		pct >= 80
			? { emoji: '🎉', message: 'Luar biasa! 잘했어요!', ring: 'stroke-jade-500' }
			: pct >= 50
				? { emoji: '💪', message: 'Bagus, terus berlatih! 화이팅!', ring: 'stroke-gold-500' }
				: { emoji: '💫', message: 'Jangan menyerah, coba lagi ya!', ring: 'stroke-coral-500' }
	);
</script>

<section
	class="card flex w-full animate-rise flex-col items-center gap-6 px-5 py-10 text-center sm:px-8"
>
	<div class="relative h-36 w-36">
		<svg viewBox="0 0 120 120" class="h-full w-full -rotate-90" aria-hidden="true">
			<circle cx="60" cy="60" r={R} fill="none" class="stroke-paper-3" stroke-width="10" />
			<circle
				cx="60"
				cy="60"
				r={R}
				fill="none"
				class="ring-fill {mood.ring}"
				stroke-width="10"
				stroke-linecap="round"
				stroke-dasharray={C}
				style:--ring-c={C}
				style:stroke-dashoffset={C * (1 - pct / 100)}
			/>
		</svg>
		<div class="absolute inset-0 grid place-items-center">
			<div>
				<p class="font-serif text-4xl font-bold text-ink">{pct}%</p>
				<p class="text-xs text-ink-muted">akurasi</p>
			</div>
		</div>
	</div>

	<div class="flex flex-col items-center gap-1">
		<p class="text-4xl" aria-hidden="true">{mood.emoji}</p>
		<h2 class="font-serif text-3xl font-bold text-ink">{title}</h2>
		<p class="text-ink-muted">{mood.message}</p>
	</div>

	<div class="grid w-full grid-cols-3 gap-3">
		<StatCard flat tone="jade" value={correct} label="Benar" />
		<StatCard flat tone="coral" value={total - correct} label="Salah" />
		<StatCard flat tone="gold" value="{pct}%" label="Akurasi" />
	</div>

	<div class="flex w-full flex-col gap-3 sm:flex-row">
		<button type="button" class="btn btn-primary flex-1" onclick={onrestart}>
			<RefreshOutline class="h-5 w-5" />
			Main Lagi
		</button>
		<a href={secondary.href} class="btn btn-ghost flex-1">{secondary.label}</a>
	</div>
</section>

<style>
	.ring-fill {
		animation: ring-fill 1s cubic-bezier(0.2, 0.7, 0.2, 1) both;
	}
	@keyframes ring-fill {
		from {
			stroke-dashoffset: var(--ring-c);
		}
	}
</style>
