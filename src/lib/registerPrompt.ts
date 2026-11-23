// When to invite a guest to create an account (RegisterPromptDialog):
// - once on the home page, to announce that progress can now be saved to an account;
// - after finishing a quiz, at most once every 7 days after the last time it was dismissed.
// Browsers that have ever been signed in are never invited again.

const KEY = 'korea-register-prompt';
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

interface PromptState {
	announcedAt?: string;
	dismissedAt?: string;
	hasAccount?: boolean;
}

function read(): PromptState {
	try {
		const saved = localStorage.getItem(KEY);
		return saved ? (JSON.parse(saved) as PromptState) : {};
	} catch {
		return {};
	}
}

function update(changes: PromptState) {
	try {
		localStorage.setItem(KEY, JSON.stringify({ ...read(), ...changes }));
	} catch {
		// Storage blocked: the prompt may show again on the next visit, which is harmless.
	}
}

export function shouldAnnounce() {
	const state = read();
	return !state.hasAccount && !state.announcedAt;
}

export function shouldPromptAfterQuiz() {
	const state = read();
	if (state.hasAccount) return false;
	const dismissed = state.dismissedAt ? Date.parse(state.dismissedAt) : NaN;
	return Number.isNaN(dismissed) || Date.now() - dismissed > SNOOZE_MS;
}

export function markAnnounced() {
	update({ announcedAt: new Date().toISOString() });
}

/** "Nanti saja": no invitation after quizzes for the next 7 days. */
export function snooze() {
	update({ dismissedAt: new Date().toISOString() });
}

export function markHasAccount() {
	if (!read().hasAccount) update({ hasAccount: true });
}
