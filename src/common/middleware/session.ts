// Configures express-session, backed by Postgres via connect-pg-simple,
// so sessions survive server restarts and work across multiple instances
// (unlike the default in-memory store, which loses everything on restart
// and can't be shared between processes).

import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from '../db/index.js'; // raw pg Pool — see note below

const PgSession = connectPgSimple(session);

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error(
    'SESSION_SECRET is not set. Add a long, random value to your .env — used to sign the session cookie.'
  );
}

const isProduction = process.env.NODE_ENV === 'production';

export const sessionMiddleware = session({
  store: new PgSession({
    pool,
    tableName: 'sessions', // matches the `sessions` table already defined in schema.ts
    createTableIfMissing: false, // schema.ts already owns this table's definition
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // don't create a session/cookie until something is actually stored
  cookie: {
    httpOnly: true,
    secure: isProduction, // requires HTTPS in production; localhost dev stays false
    // 'none' is required for cross-origin requests (separate frontend/backend
    // domains, e.g. localhost:5173 -> grantly-e90w.onrender.com) — browsers
    // silently drop 'none' cookies unless secure:true is also set, which is
    // why this only flips to 'none' in production (where secure is true).
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
});