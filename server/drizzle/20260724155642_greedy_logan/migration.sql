CREATE TABLE "oauth_states" (
	"state" varchar(255) PRIMARY KEY,
	"provider" "provider" NOT NULL,
	"oidc_interaction_uid" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE INDEX "oauth_states_expires_at_idx" ON "oauth_states" ("expires_at");