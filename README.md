# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.17.0 create --template minimal --types ts --add prettier eslint tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:vercel" ai-tools="ide:opencode" --install npm korea-learning-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Authentication

Email + password auth (sign in, sign up, reset password by email) uses [Better Auth](https://www.better-auth.com) with a Postgres database (via Drizzle) and [Resend](https://resend.com) for emails. Signing in is optional; every page except `/account` is public.

| Route                   | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| `/auth/sign-in`         | Sign in (supports `?redirectTo=/path`)   |
| `/auth/sign-up`         | Create an account                        |
| `/auth/forgot-password` | Request a password reset email           |
| `/auth/reset-password`  | Set a new password from the emailed link |
| `/auth/sign-out`        | `POST` only: sign out                    |
| `/account`              | Account details (requires sign-in)       |

### Setup

1. Copy `.env.example` to `.env` and fill it in. Generate `BETTER_AUTH_SECRET` with `openssl rand -base64 32`.
2. Start a local Postgres (needs Docker) and create the tables:

```sh
npm run db:start   # in its own terminal
npm run db:push
```

3. `npm run dev`

Without `RESEND_API_KEY`, development prints password reset links to the server console instead of emailing them. To send real emails, verify a domain in Resend and set `EMAIL_FROM` to an address on it; the default `onboarding@resend.dev` sender only delivers to your own Resend account email.

### Deploying (Vercel)

Set `DATABASE_URL` (any hosted Postgres, e.g. Neon), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (your production URL), `RESEND_API_KEY` and `EMAIL_FROM` in the Vercel project, then run `npm run db:push` once against the production database.

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
