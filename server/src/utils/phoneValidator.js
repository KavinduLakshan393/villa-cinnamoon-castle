/**
 * Sanitizes and validates WhatsApp phone numbers.
 * Supports Sri Lankan local (07XXXXXXXX), Sri Lankan international (+947XXXXXXXX),
 * and standard E.164 international phone formats.
 */
export function validateAndSanitizePhone(input) {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Phone number is required.' };
  }

  // Remove spaces, dashes, dots, and parentheses
  const cleaned = input.replace(/[\s\-\.\(\)]/g, '');

  // Regex patterns:
  // 1. Sri Lanka local: 07[01245678]\d{7}
  // 2. Sri Lanka intl:  (?:94|\+94)7[01245678]\d{7}
  const slLocalRegex = /^0(7[01245678]\d{7})$/;
  const slIntlRegex = /^(?:\+?94)(7[01245678]\d{7})$/;
  // 3. General E.164: +[country code][subscriber number] min 8 to max 15 digits
  const e164Regex = /^\+?[1-9]\d{7,14}$/;

  let standardFormat = cleaned;

  if (slLocalRegex.test(cleaned)) {
    const match = cleaned.match(slLocalRegex);
    standardFormat = `+94${match[1]}`;
    return { valid: true, sanitized: standardFormat, local: cleaned };
  }

  if (slIntlRegex.test(cleaned)) {
    const match = cleaned.match(slIntlRegex);
    standardFormat = `+94${match[1]}`;
    return { valid: true, sanitized: standardFormat, local: `0${match[1]}` };
  }

  if (e164Regex.test(cleaned)) {
    if (!standardFormat.startsWith('+')) {
      standardFormat = `+${standardFormat}`;
    }
    return { valid: true, sanitized: standardFormat, local: cleaned };
  }

  return {
    valid: false,
    error: 'Please enter a valid phone number (e.g. 076 100 7686 or +94 76 100 7686).'
  };
}
