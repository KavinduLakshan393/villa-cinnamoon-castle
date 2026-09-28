-- PostgreSQL standard-conforming strings preserve backslashes. The original
-- pattern used two, which matched a literal backslash instead of a leading +.
ALTER TABLE "inquiries"
DROP CONSTRAINT "inquiries_whatsapp_check";

ALTER TABLE "inquiries"
ADD CONSTRAINT "inquiries_whatsapp_check"
CHECK ("whatsapp_number" ~ '^\+[1-9][0-9]{6,14}$');
