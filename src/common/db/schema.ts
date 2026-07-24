import {pgTable,varchar,uuid,text,boolean,timestamp,} from 'drizzle-orm/pg-core'


export const users = pgTable("users",{
    id:uuid('id').primaryKey().defaultRandom(),
    email:varchar('email',{length:255}).notNull().unique(),
    emailIsVerified: boolean('email_is_verified').notNull().default(false),
    displayName:varchar('display_name',{length:100}).notNull(),
    avatarUrl:text('avatar_url'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
})
