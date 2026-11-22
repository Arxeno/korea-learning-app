<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { ArrowLeftOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>{page.status} - Hangul Learning</title>
</svelte:head>

<div class="card mx-auto flex max-w-lg flex-col items-center gap-3 px-6 py-14 text-center">
	<p class="stamp text-base">{page.status}</p>
	<p lang="ko" class="font-serif text-4xl font-bold text-ink">
		{page.status === 404 ? '길을 잃었어요' : '앗, 문제가 생겼어요'}
	</p>
	<p class="text-ink-muted">
		{page.error?.message ??
			(page.status === 404 ? 'Halaman tidak ditemukan.' : 'Terjadi kesalahan.')}
	</p>
	<a href={resolve('/')} class="btn btn-ghost mt-4">
		<ArrowLeftOutline class="h-5 w-5" />
		Kembali ke Beranda
	</a>
</div>
