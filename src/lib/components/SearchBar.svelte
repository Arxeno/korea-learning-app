<script lang="ts">
	let {
		value = $bindable(''),
		placeholder = 'Cari kosa kata...'
	}: { value?: string; placeholder?: string } = $props();
</script>

<div class="relative">
	<svg
		class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
		/>
	</svg>
	<input
		type="text"
		bind:value
		{placeholder}
		class="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pr-4 pl-10 text-gray-700 transition-colors placeholder:text-gray-400 focus:border-purple-400 focus:outline-none"
	/>
</div>
