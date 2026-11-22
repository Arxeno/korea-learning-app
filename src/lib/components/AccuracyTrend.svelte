<script lang="ts">
	import { accuracyPath, dotCoords, type TrendPoint } from '$lib/scoreChart';

	let { points }: { points: TrendPoint[] } = $props();

	// Drawn at the container's real pixel width so labels keep a readable size on phones.
	let width = $state(560);
	const LEFT = 36; // gutter for the y-axis labels
	const W = $derived(Math.max(260, width) - LEFT);
	const H = 220;
	const PAD = 28;
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

<div bind:clientWidth={width}>
	<svg
		viewBox="0 0 {W + LEFT} {H}"
		class="h-auto w-full overflow-visible"
		role="img"
		aria-label="Grafik tren akurasi"
	>
		<defs>
			<linearGradient id="accuracy-fill" x1="0" x2="0" y1="0" y2="1">
				<stop offset="0%" style="stop-color: var(--color-coral-500); stop-opacity: 0.22" />
				<stop offset="100%" style="stop-color: var(--color-coral-500); stop-opacity: 0" />
			</linearGradient>
		</defs>
		{#each [0, 50, 100] as g (g)}
			{@const y = PAD + innerH - (g / 100) * innerH}
			<text x={LEFT - 6} y={y + 4} text-anchor="end" class="fill-ink-muted" font-size="12"
				>{g}%</text
			>
		{/each}
		<g transform="translate({LEFT} 0)">
			{#each [0, 50, 100] as g (g)}
				{@const y = PAD + innerH - (g / 100) * innerH}
				<line
					x1={PAD / 2}
					x2={W - 8}
					y1={y}
					y2={y}
					class="stroke-paper-3"
					stroke-dasharray={g === 0 ? '' : '4 6'}
				/>
			{/each}
			{#if area}
				<path d={area} fill="url(#accuracy-fill)" />
			{/if}
			{#if path && points.length >= 2}
				<path
					d={path}
					fill="none"
					class="stroke-coral-500"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			{/if}
			{#each dots as d, i (i)}
				<circle cx={d.x} cy={d.y} r="5" class="fill-surface stroke-coral-500" stroke-width="2.5">
					<title>{points[i].label}: {points[i].accuracy}%</title>
				</circle>
			{/each}
			{#each labelIdx as i (i)}
				<text x={dots[i].x} y={H - 6} text-anchor="middle" class="fill-ink-muted" font-size="12">
					{points[i].label}
				</text>
			{/each}
		</g>
	</svg>
</div>
