<script lang="ts">
	import { accuracyPath, dotCoords, type TrendPoint } from '$lib/scoreChart';

	let { points }: { points: TrendPoint[] } = $props();

	const W = 600;
	const H = 220;
	const PAD = 32;
	const innerH = H - PAD * 2;

	const path = $derived(accuracyPath(points, W, H, PAD));
	const dots = $derived(dotCoords(points, W, H, PAD));
	const area = $derived.by(() => {
		if (!path || dots.length < 2) return '';
		const firstX = dots[0].x.toFixed(1);
		const lastX = dots[dots.length - 1].x.toFixed(1);
		return `${path} L${lastX},${H - PAD} L${firstX},${H - PAD} Z`;
	});
	const labelIdx = $derived.by(() => {
		const n = points.length;
		if (n <= 6) return points.map((_, i) => i);
		return [0, Math.floor((n - 1) / 2), n - 1];
	});
</script>

<svg viewBox="0 0 {W} {H}" class="h-auto w-full" role="img" aria-label="Grafik tren akurasi">
	{#each [0, 50, 100] as g (g)}
		{@const y = PAD + innerH - (g / 100) * innerH}
		<line
			x1={PAD}
			x2={W - 16}
			y1={y}
			y2={y}
			class="stroke-gray-200 dark:stroke-gray-700"
			stroke-dasharray={g === 100 ? '' : '4 4'}
		/>
		<text x={PAD - 6} y={y + 4} text-anchor="end" class="fill-gray-400 text-xs">{g}%</text>
	{/each}
	{#if area}
		<path d={area} class="fill-purple-200 opacity-50 dark:opacity-20" />
	{/if}
	{#if path && points.length >= 2}
		<path
			d={path}
			fill="none"
			class="stroke-purple-500"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{/if}
	{#each dots as d, i (i)}
		<circle cx={d.x} cy={d.y} r="4.5" class="fill-purple-500 stroke-white" stroke-width="2">
			<title>{points[i].label}: {points[i].accuracy}%</title>
		</circle>
	{/each}
	{#each labelIdx as i (i)}
		<text x={dots[i].x} y={H - 8} text-anchor="middle" class="fill-gray-400 text-xs">
			{points[i].label}
		</text>
	{/each}
</svg>
