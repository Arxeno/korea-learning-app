<script lang="ts">
	import { barLayout, type TrendPoint } from '$lib/scoreChart';

	let { points }: { points: TrendPoint[] } = $props();

	const W = 600;
	const H = 220;
	const PAD = 32;
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

<div class="mb-2 flex items-center justify-center gap-4 text-xs text-gray-500">
	<span class="flex items-center gap-1">
		<span class="inline-block h-3 w-3 rounded-sm bg-green-500"></span> Benar
	</span>
	<span class="flex items-center gap-1">
		<span class="inline-block h-3 w-3 rounded-sm bg-red-400"></span> Salah
	</span>
</div>

<svg viewBox="0 0 {W} {H}" class="h-auto w-full" role="img" aria-label="Grafik benar vs salah">
	{#each ticks as t (t)}
		<line
			x1={PAD}
			x2={W - 16}
			y1={yOf(t)}
			y2={yOf(t)}
			class="stroke-gray-200 dark:stroke-gray-700"
			stroke-dasharray={t === layout.maxTotal ? '' : '4 4'}
		/>
		<text x={PAD - 6} y={yOf(t) + 4} text-anchor="end" class="fill-gray-400 text-xs">{t}</text>
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
					rx="3"
					class="fill-green-500"
				/>
			{/if}
			{#if b.hWrong > 0}
				<rect
					x={b.x - b.width / 2}
					y={b.yWrong}
					width={b.width}
					height={b.hWrong}
					rx="3"
					class="fill-red-400"
				/>
			{/if}
		</g>
	{/each}
	{#each labelIdx as i (i)}
		<text x={layout.bars[i].x} y={H - 8} text-anchor="middle" class="fill-gray-400 text-xs">
			{points[i].label}
		</text>
	{/each}
</svg>
