<script lang="ts">
	let {
		label,
		correct = false,
		selected = false,
		disabled = false,
		onclick
	}: {
		label: string;
		correct?: boolean;
		selected?: boolean;
		disabled?: boolean;
		onclick?: () => void;
	} = $props();
</script>

<button
	{disabled}
	{onclick}
	class="w-full rounded-xl border-2 px-4 py-3 text-left font-medium transition-all {disabled
		? 'cursor-default opacity-60'
		: 'cursor-pointer hover:scale-[1.02] hover:shadow-md'} {selected && correct
		? 'border-green-400 bg-green-100 text-green-800'
		: selected && !correct
			? 'border-red-400 bg-red-100 text-red-800'
			: correct
				? 'border-green-400 bg-green-50'
				: 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'}"
>
	{label}
</button>
