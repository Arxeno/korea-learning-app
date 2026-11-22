import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

// The build imports server modules without a database, so only require the URL at runtime.
if (!env.DATABASE_URL && !building) throw new Error('DATABASE_URL is not set');

// postgres.js connects lazily, on the first query.
const client = postgres(env.DATABASE_URL ?? '');

export const db = drizzle(client, { schema });
