-- Google Business Profile reviews (DEC-028): one connection row and the synced reviews.
-- CreateEnum
CREATE TYPE "google_sync_status" AS ENUM ('NEVER', 'OK', 'ERROR');

-- CreateTable
CREATE TABLE "google_connections" (
    "id" VARCHAR(16) NOT NULL DEFAULT 'default',
    "encrypted_refresh_token" TEXT NOT NULL,
    "scope" VARCHAR(500) NOT NULL,
    "account_name" VARCHAR(120),
    "location_name" VARCHAR(120),
    "location_title" VARCHAR(200),
    "average_rating" DECIMAL(3,2),
    "total_review_count" INTEGER,
    "needs_reconnect" BOOLEAN NOT NULL DEFAULT false,
    "last_sync_status" "google_sync_status" NOT NULL DEFAULT 'NEVER',
    "last_sync_message" VARCHAR(500),
    "last_sync_at" TIMESTAMPTZ(3),
    "last_successful_sync_at" TIMESTAMPTZ(3),
    "connected_by_admin_id" UUID,
    "connected_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "google_connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "google_reviews" (
    "id" VARCHAR(200) NOT NULL,
    "reviewer_name" VARCHAR(200) NOT NULL,
    "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
    "star_rating" SMALLINT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "reply_comment" TEXT,
    "reply_updated_at" TIMESTAMPTZ(3),
    "synced_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "google_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "google_reviews_created_at_idx" ON "google_reviews"("created_at");

-- CreateIndex
CREATE INDEX "google_reviews_star_rating_created_at_idx" ON "google_reviews"("star_rating", "created_at");


-- Only one Google connection is ever stored.
ALTER TABLE "google_connections"
ADD CONSTRAINT "google_connections_single_row" CHECK ("id" = 'default');

ALTER TABLE "google_reviews"
ADD CONSTRAINT "google_reviews_star_rating_check" CHECK ("star_rating" BETWEEN 1 AND 5);
