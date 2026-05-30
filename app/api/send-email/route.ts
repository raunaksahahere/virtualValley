import { NextRequest, NextResponse } from "next/server";

import { getCorsHeaders, handleOptions, isOriginAllowed } from "@/lib/cors";
import { renderEmailShell, renderRows, hasEmailConfig } from "@/lib/email";
import { resend } from "@/lib/resend";
import {
  isBotSubmission,
  isValidEmail,
  isWithinLength,
  sanitizeFormData,
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

  const { name, email, message, website } = body;
  const honeypot = typeof website === "string" ? website : undefined;

  if (isBotSubmission(honeypot)) {
    return NextResponse.json(
      { message: "Message sent successfully.", success: true },
      { status: 200, headers: corsHeaders },
    );
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return errorResponse("Name, email, and message are required.", 400, corsHeaders);
  }

  if (!isValidEmail(email)) {
    return errorResponse("Invalid email address.", 400, corsHeaders);
  }

  if (!isWithinLength(name, 100) || !isWithinLength(message, 2000)) {
    return errorResponse("Input exceeds maximum length.", 400, corsHeaders);
  }

  const clean = sanitizeFormData({ name, email, message });

  if (!hasEmailConfig()) {
    return errorResponse("Email service is not configured.", 500, corsHeaders);
  }

  try {
    const html = renderEmailShell(
      `New Contact Message from ${clean.name}`,
      renderRows([
        { label: "Name", value: clean.name },
        { label: "Email", value: clean.email },
        { label: "Message", value: clean.message },
        {
          label: "Timestamp",
          value: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
      ]),
    );

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Message from ${clean.name}`,
      html,
    });

    return NextResponse.json(
      { message: "Message sent successfully.", success: true },
      { status: 200, headers: corsHeaders },
    );
  } catch (error) {
    console.error("Email send error:", error);
    return errorResponse("Unable to send your message right now.", 500, corsHeaders);
  }
}
