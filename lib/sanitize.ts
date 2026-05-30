/**
 * Sanitization utilities for API route input validation.
 * Used on all form-handling API routes before processing data.
 */

// Strip HTML tags and dangerous characters
export function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[<>'"]/g, "")
    .trim();
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate phone - allows Indian formats
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;
  return phoneRegex.test(phone);
}

// Sanitize a full form object - strips HTML from all string fields
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = { ...data } as Record<string, unknown>;

  for (const key in sanitized) {
    if (typeof sanitized[key] === "string") {
      sanitized[key] = stripHtml(sanitized[key]);
    }
  }

  return sanitized as T;
}

// Check honeypot field - returns true if bot detected
export function isBotSubmission(honeypot: string | undefined): boolean {
  return typeof honeypot === "string" && honeypot.length > 0;
}

// Enforce field length limits
export function isWithinLength(value: string, max: number): boolean {
  return value.length <= max;
}
