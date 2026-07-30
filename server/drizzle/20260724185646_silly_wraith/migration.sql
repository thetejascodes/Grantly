CREATE TABLE "sessions" (
	"sid" varchar(255) PRIMARY KEY,
	"sess" jsonb NOT NULL,
	"expire" timestamp(6) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "sessions_expire_idx" ON "sessions" ("expire");