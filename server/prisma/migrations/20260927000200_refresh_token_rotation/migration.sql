-- The original single token hash becomes a rotation family (admin_sessions)
-- plus immutable hashed refresh tokens. No sessions exist before auth launch.
DROP INDEX "admin_sessions_token_hash_key";

ALTER TABLE "admin_sessions"
  DROP COLUMN "token_hash",
  ADD COLUMN "last_used_at" TIMESTAMPTZ(3);

CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL,
    "admin_session_id" UUID NOT NULL,
    "token_hash" CHAR(64) NOT NULL,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "used_at" TIMESTAMPTZ(3),
    "revoked_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "refresh_tokens_token_hash_key" ON "refresh_tokens"("token_hash");
CREATE INDEX "refresh_tokens_admin_session_id_expires_at_idx" ON "refresh_tokens"("admin_session_id", "expires_at");

ALTER TABLE "refresh_tokens"
  ADD CONSTRAINT "refresh_tokens_admin_session_id_fkey"
  FOREIGN KEY ("admin_session_id") REFERENCES "admin_sessions"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
