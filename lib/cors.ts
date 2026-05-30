/**
 * CORS utility for API routes.
 * Only allows requests from the production domain and localhost in dev.
 */

const ALLOWED_ORIGINS = [
  "https://thevirtualvalley.com",
  "https://www.thevirtualvalley.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

export function getCorsHeaders(requestOrigin: string | null): Record<string, string> {
  const origin =
    requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)
      ? requestOrigin
      : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export function handleOptions(requestOrigin: string | null): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(requestOrigin),
  });
}

export function isOriginAllowed(requestOrigin: string | null): boolean {
  if (!requestOrigin) return false;
  return ALLOWED_ORIGINS.includes(requestOrigin);
}
