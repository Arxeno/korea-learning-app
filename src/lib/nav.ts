import {
	AwardOutline,
	BookOpenOutline,
	BrainOutline,
	ClipboardCheckOutline,
	HomeOutline
} from 'flowbite-svelte-icons';

/** Main sections, shared by the desktop header and the mobile tab bar. */
export const links = [
	{ route: '/', label: 'Beranda', ko: '홈', icon: HomeOutline },
	{ route: '/vocabulary', label: 'Kosa Kata', ko: '단어', icon: BookOpenOutline },
	{ route: '/quiz', label: 'Kuis', ko: '퀴즈', icon: BrainOutline },
	{ route: '/practice', label: 'Latihan', ko: '연습', icon: ClipboardCheckOutline },
	{ route: '/scores', label: 'Skor', ko: '점수', icon: AwardOutline }
] as const;

/** Sub-pages (e.g. /practice/numbers) keep their section highlighted. */
export function isActive(pathname: string, href: string, home: string): boolean {
	return pathname === href || (href !== home && pathname.startsWith(`${href}/`));
}
