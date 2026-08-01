CREATE TYPE "oidc_payload_type" AS ENUM('Session', 'AccessToken', 'AuthorizationCode', 'RefreshToken', 'DeviceCode', 'ClientCredentials', 'Client', 'InitialAccessToken', 'RegistrationAccessToken', 'Interaction', 'Grant', 'BackchannelAuthenticationRequest', 'PushedAuthorizationRequest');--> statement-breakpoint
CREATE TABLE "oidc_payloads" (
	"id" varchar(255) NOT NULL,
	"type" "oidc_payload_type" NOT NULL,
	"payload" jsonb NOT NULL,
	"grant_id" varchar(255),
	"user_code" varchar(255),
	"uid" varchar(255),
	"expires_at" timestamp with time zone,
	CONSTRAINT "oidc_payloads_id_type_unique" UNIQUE("id","type")
);
--> statement-breakpoint
CREATE INDEX "oidc_payloads_grant_id_idx" ON "oidc_payloads" ("grant_id");--> statement-breakpoint
CREATE INDEX "oidc_payloads_user_code_idx" ON "oidc_payloads" ("user_code");--> statement-breakpoint
CREATE INDEX "oidc_payloads_uid_idx" ON "oidc_payloads" ("uid");--> statement-breakpoint
CREATE INDEX "oidc_payloads_expires_at_idx" ON "oidc_payloads" ("expires_at");