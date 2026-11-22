<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button, Card } from 'flowbite-svelte';
	import { UserCircleSolid } from 'flowbite-svelte-icons';

	let { data } = $props();

	const joined = $derived(
		new Date(data.account.createdAt).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);
</script>

<svelte:head>
	<title>Akun - Hangul Learning</title>
</svelte:head>

<div class="flex justify-center py-4 sm:py-8">
	<Card size="md" class="w-full p-6 sm:p-8">
		<div class="flex items-center gap-4">
			<UserCircleSolid class="h-14 w-14 shrink-0 text-purple-500" />
			<div class="min-w-0">
				<h1 class="truncate text-2xl font-bold text-gray-900">{data.account.name}</h1>
				<p class="truncate text-sm text-gray-500">{data.account.email}</p>
			</div>
		</div>

		<p class="mt-6 text-sm text-gray-600">Bergabung sejak {joined}</p>

		<div class="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
			<Button href={resolve('/auth/forgot-password')} color="light" class="flex-1">
				Ubah kata sandi
			</Button>
			<form method="POST" action={resolve('/auth/sign-out')} class="flex-1">
				<Button type="submit" color="red" outline class="w-full">Keluar</Button>
			</form>
		</div>
	</Card>
</div>
