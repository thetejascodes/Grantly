ALTER TABLE "oauth_clients" ADD COLUMN "owner_user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "oauth_clients" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "oauth_clients" ADD CONSTRAINT "oauth_clients_owner_user_id_users_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE CASCADE;