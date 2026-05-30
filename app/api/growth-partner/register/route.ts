import { NextRequest, NextResponse } from "next/server";

import { getCorsHeaders, handleOptions, isOriginAllowed } from "@/lib/cors";
import { hasEmailConfig, renderEmailShell, renderRows } from "@/lib/email";
import { resend } from "@/lib/resend";
import {
  isBotSubmission,
  isValidEmail,
  isValidPhone,
  isWithinLength,
  sanitizeFormData,
  stripHtml,
} from "@/lib/sanitize";

function errorResponse(message: string, status: number, headers: Record<string, string>) {
  return NextResponse.json({ message, error: message }, { status, headers });
}

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request.headers.get("origin"));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (!isOriginAllowed(origin)) {
    return errorResponse("Forbidden", 403, corsHeaders);
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return errorResponse("Invalid request body", 400, corsHeaders);
    }

    body = parsed as Record<string, unknown>;
  } catch {
    return errorResponse("Invalid request body", 400, corsHeaders);
  }

  const websiteValue = body.website;
  const honeypot =
    typeof websiteValue === "string"
      ? websiteValue
      : websiteValue == null
        ? undefined
        : String(websiteValue);

  if (isBotSubmission(honeypot)) {
    return NextResponse.json(
      { message: "Registration submitted successfully.", success: true },
      { status: 200, headers: corsHeaders },
    );
  }

  const formFields: Record<string, string> = {};

  for (const [key, value] of Object.entries(body)) {
    if (key === "website" || value == null) continue;

    if (typeof value !== "string") {
      return errorResponse("Invalid request body", 400, corsHeaders);
    }

    formFields[key] = value;
  }

  const { name, email, phone, city } = formFields;

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !city?.trim()) {
    return errorResponse("Name, email, phone, and city are required.", 400, corsHeaders);
  }

  if (!isValidEmail(email)) {
    return errorResponse("Invalid email address.", 400, corsHeaders);
  }

  if (!isValidPhone(phone)) {
    return errorResponse("Invalid phone number.", 400, corsHeaders);
  }

  for (const [key, value] of Object.entries(formFields)) {
    const maxLength = key === "message" ? 2000 : 100;

    if (!isWithinLength(value, maxLength)) {
      return errorResponse("Input exceeds maximum length.", 400, corsHeaders);
    }
  }

  const clean = sanitizeFormData(formFields);

  if (!hasEmailConfig()) {
    return errorResponse("Email service is not configured.", 500, corsHeaders);
  }

  try {
    const rows = Object.entries(clean)
      .filter((entry): entry is [string, string] => Boolean(entry[1]))
      .map(([label, value]) => ({
        label: stripHtml(label.replace(/([A-Z])/g, " $1").trim()),
        value,
      }));

    const html = renderEmailShell(
      `New Growth Partner Registration - ${clean.name}`,
      renderRows(rows),
    );

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Growth Partner Registration - ${clean.name}`,
      html,
    });

    return NextResponse.json(
      { message: "Registration submitted successfully.", success: true },
      { status: 200, headers: corsHeaders },
    );
  } catch (error) {
    console.error("Growth partner email send error:", error);
    return errorResponse("Unable to submit registration right now.", 500, corsHeaders);
  }
}
