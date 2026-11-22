import { Resend } from 'resend';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function sendPasswordResetEmail(to: string, name: string, url: string) {
	if (!env.RESEND_API_KEY) {
		// Without an API key there is no way to deliver the email, so surface the link instead.
		if (dev) {
			console.info(`[auth] Password reset link for ${to}: ${url}`);
		} else {
			console.warn('[auth] RESEND_API_KEY is not set; password reset email was not sent.');
		}
		return;
	}

	const resend = new Resend(env.RESEND_API_KEY);
	const greeting = name ? `Halo ${name},` : 'Halo,';

	const { error } = await resend.emails.send({
		from: env.EMAIL_FROM || 'Hangul Learning <onboarding@resend.dev>',
		to,
		subject: 'Atur ulang kata sandi Hangul Learning',
		text: [
			greeting,
			'',
			'Kami menerima permintaan untuk mengatur ulang kata sandi akunmu.',
			'Buka tautan berikut untuk membuat kata sandi baru (berlaku 1 jam):',
			url,
			'',
			'Jika kamu tidak meminta ini, abaikan email ini. Kata sandimu tidak akan berubah.'
		].join('\n'),
		html: `
			<p>${escapeHtml(greeting)}</p>
			<p>Kami menerima permintaan untuk mengatur ulang kata sandi akunmu.</p>
			<p>
				<a href="${escapeHtml(url)}"
					style="display:inline-block;padding:10px 20px;border-radius:8px;background:#8b5cf6;color:#fff;text-decoration:none;font-weight:600">
					Atur ulang kata sandi
				</a>
			</p>
			<p>Tautan ini berlaku selama 1 jam.</p>
			<p style="color:#6b7280">Jika kamu tidak meminta ini, abaikan email ini. Kata sandimu tidak akan berubah.</p>
		`
	});

	if (error) {
		// Logged, not thrown: the response must not reveal whether the email exists.
		console.error('[auth] Failed to send password reset email:', error);
	}
}
