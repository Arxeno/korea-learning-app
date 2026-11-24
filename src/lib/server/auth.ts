import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { eq } from 'drizzle-orm';
import { building } from '$app/environment';
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { db } from './db';
import * as schema from './db/schema';
import { sendPasswordResetEmail } from './email';

export const auth = betterAuth({
	// `vite build` imports this module without runtime env vars; placeholders keep Better Auth
	// from refusing to start there. They are never used to serve requests.
	secret: building ? 'build-time-placeholder-secret-not-used-at-runtime' : env.BETTER_AUTH_SECRET,
	baseURL: building ? 'http://localhost' : env.BETTER_AUTH_URL,
	database: drizzleAdapter(db, { provider: 'pg', schema }),
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
		resetPasswordTokenExpiresIn: 60 * 60, // 1 hour
		revokeSessionsOnPasswordReset: true,
		sendResetPassword: async ({ user, url }) => {
			await sendPasswordResetEmail(user.email, user.name, url);
		}
	},
	databaseHooks: {
		session: {
			create: {
				// Every new session is a login (sign-in, or the automatic sign-in after sign-up).
				after: async (session) => {
					try {
						await db
							.update(schema.user)
							.set({ lastLoginAt: new Date() })
							.where(eq(schema.user.id, session.userId));
					} catch (error) {
						// Only bookkeeping: a failure here must not block the sign-in.
						console.error('[auth] could not save the last login time', error);
					}
				}
			}
		}
	},
	// Lets auth.api calls in form actions set session cookies. Must be the last plugin.
	plugins: [sveltekitCookies(getRequestEvent)]
});
