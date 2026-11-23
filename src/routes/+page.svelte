<script lang="ts">
	import { words, lessonKey, lessonLabel, lessonsIn } from '$lib/vocab';
	import { getLessonExercises } from '$lib/exercises';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { scoreStore } from '$lib/stores.svelte';
	import { resolve } from '$app/paths';
	import { markAnnounced, shouldAnnounce } from '$lib/registerPrompt';
	import RegisterPromptDialog from '$lib/components/RegisterPromptDialog.svelte';
	import {
		ArrowRightOutline,
		AwardOutline,
		BookOpenOutline,
		BrainOutline,
		ClipboardCheckOutline
	} from 'flowbite-svelte-icons';

	const lessons = lessonsIn(words).map((key) => ({
		key,
		label: lessonLabel(key),
		title: key === 'umum' ? 'Kosakata dasar' : getLessonExercises(key)?.title,
		count: words.filter((w) => lessonKey(w) === key).length
	}));

	// Same word for everyone all day: the date is taken in Jakarta time so the
	// server render and the browser agree. The prime stride spreads consecutive
	// days across lessons instead of walking one topic in order.
	const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date());
	const dayNumber = Math.floor(Date.parse(today) / 86_400_000);
	const wordOfDay = words[(dayNumber * 7919) % words.length];

	const tones = {
		coral: 'bg-coral-50 text-coral-600 ring-coral-100',
		navy: 'bg-navy-50 text-navy-600 ring-navy-100',
		jade: 'bg-jade-50 text-jade-600 ring-jade-100',
		gold: 'bg-gold-50 text-gold-600 ring-gold-100'
	};

	const menu = $derived([
		{
			href: resolve('/vocabulary'),
			ko: '단어',
			title: 'Kosa Kata',
			desc: `${words.length} kata dalam kartu balik`,
			icon: BookOpenOutline,
			tone: tones.coral
		},
		{
			href: resolve('/quiz'),
			ko: '퀴즈',
			title: 'Kuis',
			desc: 'Uji pengetahuanmu',
			icon: BrainOutline,
			tone: tones.navy
		},
		{
			href: resolve('/practice'),
			ko: '연습',
			title: 'Latihan',
			desc: 'Soal buku & latihan angka',
			icon: ClipboardCheckOutline,
			tone: tones.jade
		},
		{
			href: resolve('/scores'),
			ko: '점수',
			title: 'Skor',
			desc: `${scoreStore.totalQuizzes} kuis diselesaikan`,
			icon: AwardOutline,
			tone: tones.gold
		}
	]);

	// One-time announcement for guests that progress can now be saved to an account.
	let announceOpen = $state(false);
	onMount(() => {
		if (!page.data.user && shouldAnnounce()) {
			announceOpen = true;
			markAnnounced();
		}
	});
</script>

<svelte:head>
	<title>Hangul Learning - Belajar Bahasa Korea</title>
</svelte:head>

<div class="flex flex-col gap-14 sm:gap-20">
	<section class="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
		<div class="flex flex-col items-start gap-6">
			<span class="tag text-sm"><span lang="ko">안녕하세요</span> 👋</span>
			<div>
				<h1
					class="font-serif text-6xl leading-[1.05] font-bold tracking-tight text-ink sm:text-7xl"
				>
					<span lang="ko">같이 <span class="text-coral-600">배워요</span></span>
				</h1>
				<p class="mt-3 text-sm text-ink-muted italic">gachi baewoyo — ayo belajar bersama</p>
			</div>
			<p class="max-w-md text-lg text-ink-soft">
				Belajar bahasa Korea dengan cara yang menyenangkan! Kartu kosakata, kuis, dan latihan dari
				buku pelajaran.
			</p>
			<div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
				<a href={resolve('/quiz')} class="btn btn-primary">
					Mulai Kuis
					<ArrowRightOutline class="h-5 w-5" />
				</a>
				<a href={resolve('/vocabulary')} class="btn btn-ghost">Lihat Kosa Kata</a>
			</div>
		</div>

		<article class="card relative overflow-hidden p-7 sm:p-9">
			<span
				aria-hidden="true"
				lang="ko"
				class="pointer-events-none absolute right-6 bottom-3 font-serif text-[8rem] leading-none text-paper-2 select-none sm:text-[10rem]"
				>한</span
			>
			<div class="relative flex flex-col gap-5">
				<div class="flex items-center justify-between">
					<p class="eyebrow">Kata hari ini</p>
					<span class="stamp" lang="ko">오늘의 단어</span>
				</div>
				<div>
					<p class="font-serif text-6xl font-bold text-ink sm:text-7xl" lang="ko">
						{wordOfDay.hangeul}
					</p>
					<p class="mt-2 text-lg text-ink-muted italic">{wordOfDay.phonetic}</p>
				</div>
				<div class="h-px w-16 bg-coral-500/60"></div>
				<p class="text-2xl font-semibold text-ink">{wordOfDay.idMean}</p>
				<div class="flex flex-wrap items-center gap-2">
					<span class="tag">{lessonLabel(lessonKey(wordOfDay))}</span>
					<span class="tag">{wordOfDay.category}</span>
					{#if wordOfDay.topic}
						<span class="tag">{wordOfDay.topic}</span>
					{/if}
				</div>
			</div>
		</article>
	</section>

	<section class="flex flex-col gap-5">
		<h2 class="font-serif text-2xl font-bold text-ink">Mau belajar apa hari ini?</h2>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each menu as item (item.href)}
				{@const Icon = item.icon}
				<a href={item.href} class="card card-link group flex flex-col gap-5 p-6">
					<div class="flex items-start justify-between">
						<span class="grid h-12 w-12 place-items-center rounded-xl ring-1 {item.tone}">
							<Icon class="h-6 w-6" />
						</span>
						<span lang="ko" class="font-serif text-2xl font-bold text-paper-4">{item.ko}</span>
					</div>
					<div class="flex items-end justify-between gap-2">
						<div>
							<h3 class="text-lg font-bold text-ink">{item.title}</h3>
							<p class="text-sm text-ink-muted">{item.desc}</p>
						</div>
						<ArrowRightOutline
							class="h-5 w-5 shrink-0 text-ink-muted transition group-hover:translate-x-1 group-hover:text-ink"
						/>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section class="flex flex-col gap-5">
		<div>
			<h2 class="font-serif text-2xl font-bold text-ink">Pelajaran</h2>
			<p class="text-sm text-ink-muted">Buka kosakata per pelajaran</p>
		</div>
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
			{#each lessons as lesson (lesson.key)}
				<a
					href={resolve(`/vocabulary?lesson=${lesson.key}`)}
					class="card card-link group flex items-center gap-4 p-4"
				>
					<span
						class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-paper-2 font-serif text-xl font-bold text-ink"
						lang="ko"
					>
						{lesson.key === 'umum' ? '가' : lesson.key}
					</span>
					<div class="min-w-0 flex-1">
						<p class="font-semibold text-ink">{lesson.label}</p>
						<p class="truncate text-sm text-ink-muted">
							{#if lesson.title}<span lang="ko">{lesson.title}</span> ·{/if}
							{lesson.count} kata
						</p>
					</div>
					<ArrowRightOutline
						class="h-5 w-5 shrink-0 text-ink-muted transition group-hover:translate-x-1 group-hover:text-ink"
					/>
				</a>
			{/each}
		</div>
	</section>
</div>

<RegisterPromptDialog bind:open={announceOpen} variant="announce" />
