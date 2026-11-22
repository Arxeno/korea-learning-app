import { tick } from 'svelte';

/**
 * After an answer, bring the feedback + "next" button into view (on phones it
 * usually lands below the fold, behind the tab bar) and move focus to the
 * button, since the answer buttons that held focus are now disabled.
 */
export async function revealActions(getEl: () => HTMLElement | undefined) {
	// The actions block only renders once the answer state flushes, so read it after tick().
	await tick();
	const el = getEl();
	if (!el) return;
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	el.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
	el.querySelector('button')?.focus({ preventScroll: true });
}
