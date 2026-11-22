import { isAPIError } from 'better-auth/api';

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;

/**
 * Only allow same-site relative paths as redirect targets, so `?redirectTo=`
 * can't send users to another site (e.g. `//evil.com` or `/\evil.com`).
 */
export function safeRedirect(
	target: FormDataEntryValue | string | null | undefined,
	fallback = '/'
) {
	if (typeof target !== 'string') return fallback;
	if (!target.startsWith('/') || target.startsWith('//') || target.startsWith('/\\')) {
		return fallback;
	}
	return target;
}

/** Read a trimmed string field from submitted form data. */
export function field(data: FormData, name: string) {
	const value = data.get(name);
	return typeof value === 'string' ? value.trim() : '';
}

/** Read a password field without trimming: spaces are valid password characters. */
export function passwordField(data: FormData, name: string) {
	const value = data.get(name);
	return typeof value === 'string' ? value : '';
}

export function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Returns an error message for an invalid new password, or null if it is acceptable. */
export function validateNewPassword(password: string, confirm: string) {
	if (password.length < MIN_PASSWORD_LENGTH) {
		return `Kata sandi minimal ${MIN_PASSWORD_LENGTH} karakter.`;
	}
	if (password.length > MAX_PASSWORD_LENGTH) {
		return `Kata sandi maksimal ${MAX_PASSWORD_LENGTH} karakter.`;
	}
	if (password !== confirm) {
		return 'Konfirmasi kata sandi tidak cocok.';
	}
	return null;
}

const MESSAGES: Record<string, string> = {
	INVALID_EMAIL_OR_PASSWORD: 'Email atau kata sandi salah.',
	INVALID_EMAIL: 'Format email tidak valid.',
	INVALID_PASSWORD: 'Email atau kata sandi salah.',
	USER_ALREADY_EXISTS: 'Email ini sudah terdaftar. Silakan masuk.',
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'Email ini sudah terdaftar. Silakan masuk.',
	PASSWORD_TOO_SHORT: `Kata sandi minimal ${MIN_PASSWORD_LENGTH} karakter.`,
	PASSWORD_TOO_LONG: `Kata sandi maksimal ${MAX_PASSWORD_LENGTH} karakter.`,
	INVALID_TOKEN: 'Tautan atur ulang kata sandi tidak valid atau sudah kedaluwarsa.',
	TOKEN_EXPIRED: 'Tautan atur ulang kata sandi tidak valid atau sudah kedaluwarsa.'
};

/** Map a Better Auth error to a user-facing Indonesian message. */
export function authErrorMessage(error: unknown) {
	if (isAPIError(error)) {
		const code = error.body?.code;
		if (code && MESSAGES[code]) return MESSAGES[code];
		if (error.status === 'TOO_MANY_REQUESTS' || error.statusCode === 429) {
			return 'Terlalu banyak percobaan. Coba lagi beberapa saat lagi.';
		}
	}
	console.error('[auth]', error);
	return 'Terjadi kesalahan. Silakan coba lagi.';
}
