<script lang="ts">
	let {
		value,
		label,
		color = 'purple'
	}: { value: number; label: string; color?: string } = $props();

	const colorMap: Record<string, string> = {
		purple: 'from-purple-500 to-indigo-500',
		pink: 'from-pink-500 to-rose-500',
		cyan: 'from-cyan-500 to-teal-500',
		amber: 'from-amber-500 to-orange-500'
	};
</script>

<div
	class="flex flex-col items-center rounded-2xl bg-gradient-to-br {colorMap[color] ||
		colorMap.purple} p-5 text-white shadow-lg"
>
	<span class="text-3xl font-bold">{value}</span>
	<span class="mt-1 text-sm opacity-90">{label}</span>
</div>
