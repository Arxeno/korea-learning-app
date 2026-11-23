import { browser } from '$app/environment';
import { markHasAccount } from '$lib/registerPrompt';
import { useProgress } from '$lib/stores.svelte';
import type { LayoutLoad } from './$types';

// Runs in the browser before any page renders, and again whenever the server data changes
// (sign-in, sign-up, sign-out), so pages like the quiz read the right progress from the start.
export const load: LayoutLoad = ({ data }) => {
	if (browser) {
		useProgress(data.progress);
		if (data.user) markHasAccount();
	}
	return data;
};
