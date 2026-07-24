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
