<script lang="ts">
	let { size = 'md' }: { size?: 'sm' | 'md' } = $props();
</script>

<!-- A small 도장 (name seal) used as the app's mark. -->
<span
	aria-hidden="true"
	class="inline-grid shrink-0 -rotate-3 place-items-center bg-coral-500 font-serif font-bold text-paper shadow-[inset_0_0_0_2px_rgb(251_247_240/0.35)] {size ===
	'sm'
		? 'h-6 w-6 rounded-md text-sm'
		: 'h-10 w-10 rounded-xl text-xl'}"
>
	한
</span>
