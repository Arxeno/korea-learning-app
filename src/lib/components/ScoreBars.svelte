<script lang="ts">
	import { barLayout, type TrendPoint } from '$lib/scoreChart';

	let { points }: { points: TrendPoint[] } = $props();

	// Drawn at the container's real pixel width so labels keep a readable size on phones.
	let width = $state(560);
	const LEFT = 36; // gutter for the y-axis labels
	const W = $derived(Math.max(260, width) - LEFT);
	const H = 220;
	const PAD = 28;
	const innerH = H - PAD * 2;

	const layout = $derived(barLayout(points, W, H, PAD));
	const ticks = $derived.by(() => {
		const m = layout.maxTotal;
		return [...new Set([0, Math.round(m / 2), m])].sort((a, b) => a - b);
	});
	const labelIdx = $derived.by(() => {
		const n = points.length;
		if (n <= 6) return points.map((_, i) => i);
		return [0, Math.floor((n - 1) / 2), n - 1];
	});
	const yOf = (v: number) => H - PAD - (v / layout.maxTotal) * innerH;
</script>

<div class="mb-2 flex items-center justify-end gap-4 text-xs text-ink-muted">
	<span class="flex items-center gap-1.5">
		<span class="inline-block h-2.5 w-2.5 rounded-full bg-jade-500"></span> Benar
	</span>
	<span class="flex items-center gap-1.5">
		<span class="inline-block h-2.5 w-2.5 rounded-full bg-coral-500"></span> Salah
	</span>
</div>

<div bind:clientWidth={width}>
	<svg
		viewBox="0 0 {W + LEFT} {H}"
		class="h-auto w-full overflow-visible"
		role="img"
		aria-label="Grafik benar vs salah"
	>
		{#each ticks as t (t)}
			<text x={LEFT - 6} y={yOf(t) + 4} text-anchor="end" class="fill-ink-muted" font-size="12"
				>{t}</text
			>
		{/each}
		<g transform="translate({LEFT} 0)">
			{#each ticks as t (t)}
				<line
					x1={0}
					x2={W - 8}
					y1={yOf(t)}
					y2={yOf(t)}
					class="stroke-paper-3"
					stroke-dasharray={t === 0 ? '' : '4 6'}
				/>
			{/each}
			{#each layout.bars as b, i (i)}
				<g>
					<title>{points[i].label}: {points[i].correct} benar, {points[i].wrong} salah</title>
					{#if b.hCorrect > 0}
						<rect
							x={b.x - b.width / 2}
							y={b.yCorrect}
							width={b.width}
							height={b.hCorrect}
							rx="4"
							class="fill-jade-500"
						/>
					{/if}
					{#if b.hWrong > 0}
						<!-- Drawn 2px short when stacked so a thin gap separates the two parts. -->
						<rect
							x={b.x - b.width / 2}
							y={b.yWrong}
							width={b.width}
							height={b.hCorrect > 0 ? Math.max(0, b.hWrong - 2) : b.hWrong}
							rx="4"
							class="fill-coral-500"
						/>
					{/if}
				</g>
			{/each}
			{#each labelIdx as i (i)}
				<text
					x={layout.bars[i].x}
					y={H - 6}
					text-anchor="middle"
					class="fill-ink-muted"
					font-size="12"
				>
					{points[i].label}
				</text>
			{/each}
		</g>
	</svg>
</div>
