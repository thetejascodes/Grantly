import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const db = drizzle(process.env.DATABASE_URL!);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5, // sessions are lightweight, low-frequency reads/writes — small pool is plenty
});