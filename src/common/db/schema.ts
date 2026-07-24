import {pgTable,varchar,uuid,text,boolean,timestamp,pgEnum,jsonb,unique,index } from 'drizzle-orm/pg-core'


export const users = pgTable("users",{
    id:uuid('id').primaryKey().defaultRandom(),
    email:varchar('email',{length:255}).notNull().unique(),
    emailIsVerified: boolean('email_is_verified').notNull().default(false),
    displayName:varchar('display_name',{length:100}).notNull(),
    avatarUrl:text('avatar_url'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
})

export const providerEnum = pgEnum("provider", ["google", "github"]);

export const userIdentities = pgTable("user_identities",{
    id:uuid('id').primaryKey().defaultRandom(),
    userId:uuid('user_id').notNull().references(() => users.id, { onDelete:'cascade' }),
    provider:providerEnum("provider").notNull(),
    providerSubject:text('provider_subject').notNull(),
    providerEmail:varchar('provider_email',{length:255}),
    rawProfile:jsonb('raw_profile'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
},(table)=>[
    unique("provider_subject_unique").on(table.provider, table.providerSubject)
]);


export const oauthStates = pgTable("oauth_states", {
    state: varchar('state', { length: 255 }).primaryKey(),
    provider: providerEnum("provider").notNull(), 
    oidcInteractionUid: varchar('oidc_interaction_uid', { length: 255 }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
}, (table) => [
    index('oauth_states_expires_at_idx').on(table.expiresAt), 
]);


export const oidcPayloadTypeEnum = pgEnum("oidc_payload_type", [
    "Session",
    "AccessToken",
    "AuthorizationCode",
    "RefreshToken",
    "DeviceCode",
    "ClientCredentials",
    "Client",
    "InitialAccessToken",
    "RegistrationAccessToken",
    "Interaction",
    "Grant",
    "BackchannelAuthenticationRequest",
    "PushedAuthorizationRequest",
]);

export const oidcPayloads = pgTable("oidc_payloads",{
    id: varchar('id', { length: 255 }).notNull(),
    type: oidcPayloadTypeEnum("type").notNull(),
    payload: jsonb('payload').notNull(),
    grantId: varchar('grant_id', { length: 255 }),
    userCode: varchar('user_code', { length: 255 }),
    uid: varchar('uid', { length: 255 }),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
},(table) => [
    unique('oidc_payloads_id_type_unique').on(table.id, table.type), // same id can exist across different types
    index('oidc_payloads_grant_id_idx').on(table.grantId),           // for revoking all tokens under a grant
    index('oidc_payloads_user_code_idx').on(table.userCode),         // for device flow lookups
    index('oidc_payloads_uid_idx').on(table.uid),                    // for interaction/session lookups by uid
    index('oidc_payloads_expires_at_idx').on(table.expiresAt),       // for expiry cleanup
])

export const sessions = pgTable("sessions",{
    sid: varchar('sid', { length: 255 }).primaryKey(),
    sess: jsonb('sess').notNull(),
    expire: timestamp('expire', { withTimezone: false, precision: 6 }).notNull(),
},(table) => [
    index('sessions_expire_idx').on(table.expire),
])

export const oauthClients = pgTable("oauth_clients",{
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: varchar('client_id', { length: 255 }).notNull().unique(),
    clientSecretHash: text('client_secret_hash'), // nullable for public clients (PKCE, no secret)
    redirectUris: jsonb('redirect_uris').notNull(), // array of strings
    grantTypes: jsonb('grant_types').notNull(),     // array of strings
    responseTypes: jsonb('response_types').notNull(), // array of strings
    scopes: jsonb('scopes').notNull(),               // array of strings
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
})