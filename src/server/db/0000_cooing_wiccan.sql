-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SCHEMA "auth";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "equality_op" AS ENUM('eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "action" AS ENUM('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "UserRole" AS ENUM('admin', 'recruiter', 'candidate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Questions" (
	"id" bigint PRIMARY KEY NOT NULL,
	"value" varchar DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Response" (
	"id" bigint PRIMARY KEY NOT NULL,
	"value" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Interview" (
	"id" bigint PRIMARY KEY NOT NULL,
	"user_id" uuid DEFAULT gen_random_uuid(),
	"candidat" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."audit_log_entries" (
	"instance_id" uuid,
	"id" uuid PRIMARY KEY NOT NULL,
	"payload" json,
	"created_at" timestamp with time zone,
	"ip_address" varchar(64) DEFAULT ''::character varying NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."schema_migrations" (
	"version" varchar(255) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."instances" (
	"id" uuid PRIMARY KEY NOT NULL,
	"uuid" uuid,
	"raw_base_config" text,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."mfa_factors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"friendly_name" text,
	"factor_type" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"secret" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."refresh_tokens" (
	"instance_id" uuid,
	"id" bigserial PRIMARY KEY NOT NULL,
	"token" varchar(255),
	"user_id" varchar(255),
	"revoked" boolean,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"parent" varchar(255),
	"session_id" uuid,
	CONSTRAINT "refresh_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."mfa_challenges" (
	"id" uuid PRIMARY KEY NOT NULL,
	"factor_id" uuid NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"verified_at" timestamp with time zone,
	"ip_address" "inet" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."mfa_amr_claims" (
	"session_id" uuid NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"authentication_method" text NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	CONSTRAINT "mfa_amr_claims_session_id_authentication_method_pkey" UNIQUE("session_id","authentication_method")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."sso_providers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"resource_id" text,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."sso_domains" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sso_provider_id" uuid NOT NULL,
	"domain" text NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."saml_providers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sso_provider_id" uuid NOT NULL,
	"entity_id" text NOT NULL,
	"metadata_xml" text NOT NULL,
	"metadata_url" text,
	"attribute_mapping" jsonb,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"name_id_format" text,
	CONSTRAINT "saml_providers_entity_id_key" UNIQUE("entity_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."saml_relay_states" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sso_provider_id" uuid NOT NULL,
	"request_id" text NOT NULL,
	"for_email" text,
	"redirect_to" text,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"flow_state_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."flow_state" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"auth_code" text NOT NULL,
	"code_challenge_method" text NOT NULL,
	"code_challenge" text NOT NULL,
	"provider_type" text NOT NULL,
	"provider_access_token" text,
	"provider_refresh_token" text,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"authentication_method" text NOT NULL,
	"auth_code_issued_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."identities" (
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"identity_data" jsonb NOT NULL,
	"provider" text NOT NULL,
	"last_sign_in_at" timestamp with time zone,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"email" text,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	CONSTRAINT "identities_provider_id_provider_unique" UNIQUE("provider_id","provider")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."users" (
	"instance_id" uuid,
	"id" uuid PRIMARY KEY NOT NULL,
	"aud" varchar(255),
	"role" varchar(255),
	"email" varchar(255),
	"encrypted_password" varchar(255),
	"email_confirmed_at" timestamp with time zone,
	"invited_at" timestamp with time zone,
	"confirmation_token" varchar(255),
	"confirmation_sent_at" timestamp with time zone,
	"recovery_token" varchar(255),
	"recovery_sent_at" timestamp with time zone,
	"email_change_token_new" varchar(255),
	"email_change" varchar(255),
	"email_change_sent_at" timestamp with time zone,
	"last_sign_in_at" timestamp with time zone,
	"raw_app_meta_data" jsonb,
	"raw_user_meta_data" jsonb,
	"is_super_admin" boolean,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"phone" text DEFAULT '',
	"phone_confirmed_at" timestamp with time zone,
	"phone_change" text DEFAULT '',
	"phone_change_token" varchar(255) DEFAULT ''::character varying,
	"phone_change_sent_at" timestamp with time zone,
	"confirmed_at" timestamp with time zone,
	"email_change_token_current" varchar(255) DEFAULT ''::character varying,
	"email_change_confirm_status" smallint DEFAULT 0,
	"banned_until" timestamp with time zone,
	"reauthentication_token" varchar(255) DEFAULT ''::character varying,
	"reauthentication_sent_at" timestamp with time zone,
	"is_sso_user" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp with time zone,
	"is_anonymous" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_phone_key" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"factor_id" uuid,
	"aal" text,
	"not_after" timestamp with time zone,
	"refreshed_at" timestamp,
	"user_agent" text,
	"ip" "inet",
	"tag" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserRoleEnum" (
	"id" bigint NOT NULL,
	"user_role" "UserRole" DEFAULT 'recruiter' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "UserRoleEnum_pkey" PRIMARY KEY("id","user_role","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "InterviewQuestionResponse" (
	"id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"interview_id" bigint NOT NULL,
	"question_id" bigint NOT NULL,
	"response_id" bigint,
	CONSTRAINT "InterviewQuestionResponse_pkey" PRIMARY KEY("id","interview_id","question_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_logs_instance_id_idx" ON "auth"."audit_log_entries" ("instance_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mfa_factors_user_friendly_name_unique" ON "auth"."mfa_factors" ("user_id","friendly_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "factor_id_created_at_idx" ON "auth"."mfa_factors" ("user_id","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "mfa_factors_user_id_idx" ON "auth"."mfa_factors" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "refresh_tokens_instance_id_idx" ON "auth"."refresh_tokens" ("instance_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "refresh_tokens_instance_id_user_id_idx" ON "auth"."refresh_tokens" ("instance_id","user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "refresh_tokens_parent_idx" ON "auth"."refresh_tokens" ("parent");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "refresh_tokens_session_id_revoked_idx" ON "auth"."refresh_tokens" ("revoked","session_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "refresh_tokens_updated_at_idx" ON "auth"."refresh_tokens" ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "mfa_challenge_created_at_idx" ON "auth"."mfa_challenges" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sso_domains_sso_provider_id_idx" ON "auth"."sso_domains" ("sso_provider_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "saml_providers_sso_provider_id_idx" ON "auth"."saml_providers" ("sso_provider_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "saml_relay_states_sso_provider_id_idx" ON "auth"."saml_relay_states" ("sso_provider_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "saml_relay_states_for_email_idx" ON "auth"."saml_relay_states" ("for_email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "saml_relay_states_created_at_idx" ON "auth"."saml_relay_states" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_auth_code" ON "auth"."flow_state" ("auth_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_user_id_auth_method" ON "auth"."flow_state" ("user_id","authentication_method");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "flow_state_created_at_idx" ON "auth"."flow_state" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "identities_user_id_idx" ON "auth"."identities" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "identities_email_idx" ON "auth"."identities" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_instance_id_idx" ON "auth"."users" ("instance_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_instance_id_email_idx" ON "auth"."users" ("instance_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "confirmation_token_idx" ON "auth"."users" ("confirmation_token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "recovery_token_idx" ON "auth"."users" ("recovery_token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_change_token_current_idx" ON "auth"."users" ("email_change_token_current");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_change_token_new_idx" ON "auth"."users" ("email_change_token_new");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reauthentication_token_idx" ON "auth"."users" ("reauthentication_token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_partial_key" ON "auth"."users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_is_anonymous_idx" ON "auth"."users" ("is_anonymous");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_created_at_idx" ON "auth"."sessions" ("user_id","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "auth"."sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_not_after_idx" ON "auth"."sessions" ("not_after");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Interview" ADD CONSTRAINT "Interview_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."mfa_factors" ADD CONSTRAINT "mfa_factors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserRoleEnum" ADD CONSTRAINT "public_UserRoleEnum_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "InterviewQuestionResponse" ADD CONSTRAINT "InterviewQuestionResponse_interview_id_Interview_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."Interview"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "InterviewQuestionResponse" ADD CONSTRAINT "InterviewQuestionResponse_question_id_Questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."Questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "InterviewQuestionResponse" ADD CONSTRAINT "InterviewQuestionResponse_response_id_Response_id_fk" FOREIGN KEY ("response_id") REFERENCES "public"."Response"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/