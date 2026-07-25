import express from 'express'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import errorHandler from './common/middleware/errorHandler.js'
import identityProviderRoutes from './modules/identity-providers/identity-provider.routes.js'

const app = express()
const PgSessionStore = connectPgSimple(session)

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET ?? 'dev-session-secret',
    resave: false,
    saveUninitialized: false,
    store: new PgSessionStore({
        conString: process.env.DATABASE_URL,
        tableName: 'sessions',
    }),
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    },
}))
app.use(identityProviderRoutes)
app.use(errorHandler)

export default app