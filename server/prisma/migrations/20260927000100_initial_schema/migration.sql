-- CreateEnum
CREATE TYPE "stay_type" AS ENUM ('WEEKDAY', 'WEEKEND');

-- CreateEnum
CREATE TYPE "cooling_type" AS ENUM ('NOT_APPLICABLE', 'NON_AC', 'AC');

-- CreateEnum
CREATE TYPE "inquiry_status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "stay_portion" AS ENUM ('WEEKDAY', 'WEEKEND');

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "display_name" VARCHAR(120) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    CONSTRAINT "admins_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "admins_email_lowercase_check" CHECK ("email" = lower("email"))
);

-- CreateTable
CREATE TABLE "admin_sessions" (
    "id" UUID NOT NULL,
    "admin_id" UUID NOT NULL,
    "token_hash" CHAR(64) NOT NULL,
    "user_agent" VARCHAR(500),
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "revoked_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "admin_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stay_options" (
    "id" UUID NOT NULL,
    "code" VARCHAR(80) NOT NULL,
    "public_name" VARCHAR(160) NOT NULL,
    "public_detail" VARCHAR(300) NOT NULL,
    "stay_type" "stay_type" NOT NULL,
    "min_guests" SMALLINT NOT NULL,
    "max_guests" SMALLINT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    CONSTRAINT "stay_options_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "stay_options_guest_range_check" CHECK ("min_guests" >= 1 AND "max_guests" >= "min_guests"),
    CONSTRAINT "stay_options_display_order_check" CHECK ("display_order" >= 0),
    CONSTRAINT "stay_options_deleted_inactive_check" CHECK ("deleted_at" IS NULL OR "is_active" = false)
);

-- CreateTable
CREATE TABLE "package_variants" (
    "id" UUID NOT NULL,
    "stay_option_id" UUID NOT NULL,
    "code" VARCHAR(80) NOT NULL,
    "title" VARCHAR(180) NOT NULL,
    "cooling_type" "cooling_type" NOT NULL,
    "nightly_rate" DECIMAL(12,2) NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    CONSTRAINT "package_variants_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "package_variants_rate_check" CHECK ("nightly_rate" >= 0),
    CONSTRAINT "package_variants_display_order_check" CHECK ("display_order" >= 0),
    CONSTRAINT "package_variants_deleted_inactive_check" CHECK ("deleted_at" IS NULL OR "is_active" = false)
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" UUID NOT NULL,
    "reference" VARCHAR(24) NOT NULL,
    "customer_name" VARCHAR(160) NOT NULL,
    "whatsapp_number" VARCHAR(16) NOT NULL,
    "check_in" DATE NOT NULL,
    "check_out" DATE NOT NULL,
    "guest_count" SMALLINT NOT NULL,
    "special_requests" VARCHAR(500),
    "consented_at" TIMESTAMPTZ(3) NOT NULL,
    "status" "inquiry_status" NOT NULL DEFAULT 'PENDING',
    "decided_at" TIMESTAMPTZ(3),
    "decided_by_admin_id" UUID,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "inquiries_date_range_check" CHECK ("check_out" > "check_in"),
    CONSTRAINT "inquiries_guest_count_check" CHECK ("guest_count" BETWEEN 1 AND 15),
    CONSTRAINT "inquiries_whatsapp_check" CHECK ("whatsapp_number" ~ '^\\+[1-9][0-9]{6,14}$'),
    CONSTRAINT "inquiries_decision_check" CHECK (
      ("status" = 'PENDING' AND "decided_at" IS NULL AND "decided_by_admin_id" IS NULL)
      OR
      ("status" IN ('ACCEPTED', 'REJECTED') AND "decided_at" IS NOT NULL AND "decided_by_admin_id" IS NOT NULL)
    )
);

-- CreateTable
CREATE TABLE "inquiry_quote_lines" (
    "id" UUID NOT NULL,
    "inquiry_id" UUID NOT NULL,
    "package_variant_id" UUID NOT NULL,
    "portion" "stay_portion" NOT NULL,
    "night_count" SMALLINT NOT NULL,
    "quoted_stay_name" VARCHAR(160) NOT NULL,
    "quoted_package_title" VARCHAR(180) NOT NULL,
    "quoted_cooling_type" "cooling_type" NOT NULL,
    "quoted_nightly_rate" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "inquiry_quote_lines_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "inquiry_quote_lines_nights_check" CHECK ("night_count" > 0),
    CONSTRAINT "inquiry_quote_lines_rate_check" CHECK ("quoted_nightly_rate" >= 0)
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
CREATE UNIQUE INDEX "admin_sessions_token_hash_key" ON "admin_sessions"("token_hash");
CREATE INDEX "admin_sessions_admin_id_expires_at_idx" ON "admin_sessions"("admin_id", "expires_at");
CREATE UNIQUE INDEX "stay_options_code_key" ON "stay_options"("code");
CREATE INDEX "stay_options_stay_type_is_active_display_order_idx" ON "stay_options"("stay_type", "is_active", "display_order");
CREATE UNIQUE INDEX "package_variants_code_key" ON "package_variants"("code");
CREATE UNIQUE INDEX "package_variants_stay_option_id_cooling_type_key" ON "package_variants"("stay_option_id", "cooling_type");
CREATE INDEX "package_variants_stay_option_id_is_active_display_order_idx" ON "package_variants"("stay_option_id", "is_active", "display_order");
CREATE UNIQUE INDEX "inquiries_reference_key" ON "inquiries"("reference");
CREATE INDEX "inquiries_check_in_created_at_idx" ON "inquiries"("check_in", "created_at");
CREATE INDEX "inquiries_status_created_at_idx" ON "inquiries"("status", "created_at");
CREATE INDEX "inquiries_whatsapp_number_idx" ON "inquiries"("whatsapp_number");
CREATE UNIQUE INDEX "inquiry_quote_lines_inquiry_id_portion_key" ON "inquiry_quote_lines"("inquiry_id", "portion");
CREATE INDEX "inquiry_quote_lines_package_variant_id_idx" ON "inquiry_quote_lines"("package_variant_id");

-- AddForeignKey
ALTER TABLE "admin_sessions" ADD CONSTRAINT "admin_sessions_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "package_variants" ADD CONSTRAINT "package_variants_stay_option_id_fkey" FOREIGN KEY ("stay_option_id") REFERENCES "stay_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_decided_by_admin_id_fkey" FOREIGN KEY ("decided_by_admin_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "inquiry_quote_lines" ADD CONSTRAINT "inquiry_quote_lines_inquiry_id_fkey" FOREIGN KEY ("inquiry_id") REFERENCES "inquiries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "inquiry_quote_lines" ADD CONSTRAINT "inquiry_quote_lines_package_variant_id_fkey" FOREIGN KEY ("package_variant_id") REFERENCES "package_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
