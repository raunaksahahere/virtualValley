import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  CAL_API_BASE_URL,
  CAL_BOOKINGS_API_VERSION,
  calHeaders,
  getCalEventTypeId,
  isCalService,
} from "@/lib/cal";
import { renderEmailShell } from "@/lib/email";
import { resend } from "@/lib/resend";
import { isValidEmail, isValidPhone, isWithinLength, sanitizeFormData } from "@/lib/sanitize";

async function sendBookingBrochure({ name, email, service }: { name: string; email: string; service: string }) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    throw new Error("Resend is not configured.");
  }

  const brochure = await readFile(path.join(process.cwd(), "public", "Brochure.pdf"));
  const html = renderEmailShell(
    `Thank you for booking with Virtual Valley, ${name}!`,
    `<p>Thank you for visiting Virtual Valley and scheduling your ${service} strategy session.</p>
     <p>We&apos;ve attached our brochure so you can explore our services and pricing before we meet. We look forward to learning about your goals and helping you build what&apos;s next.</p>
     <p>See you soon,<br /><strong>The Virtual Valley Team</strong></p>`,
  );

  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: email,
    subject: "Your Virtual Valley brochure and session confirmation",
    html,
    attachments: [{
      filename: "Virtual-Valley-Brochure.pdf",
      content: brochure,
      contentType: "application/pdf",
    }],
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, city, service, start, timeZone, referralId } = body;
  if (
    typeof name !== "string" || typeof email !== "string" || typeof phone !== "string" ||
    typeof city !== "string" || typeof service !== "string" || typeof start !== "string" ||
    !name.trim() || !email.trim() || !phone.trim() || !city.trim() || !isCalService(service)
  ) {
    return NextResponse.json({ message: "Name, email, phone, city, service, and time are required." }, { status: 400 });
  }

  if (!isValidEmail(email) || !isValidPhone(phone) || !Number.isFinite(Date.parse(start))) {
    return NextResponse.json({ message: "Please provide valid booking details." }, { status: 400 });
  }

  if (![name, email, phone, city].every((value) => isWithinLength(value, 150))) {
    return NextResponse.json({ message: "One or more fields are too long." }, { status: 400 });
  }

  if (!process.env.CAL_API_KEY) {
    return NextResponse.json({ message: "Calendar service is not configured." }, { status: 503 });
  }

  const eventTypeId = getCalEventTypeId(service);
  if (!eventTypeId) {
    return NextResponse.json({ message: `Calendar is not configured for ${service}.` }, { status: 503 });
  }

  const clean = sanitizeFormData({ name, email, phone, city, referralId: typeof referralId === "string" ? referralId : "" });
  const payload = {
    start: new Date(start).toISOString(),
    attendee: {
      name: clean.name,
      email: clean.email,
      phoneNumber: clean.phone,
      timeZone: typeof timeZone === "string" && timeZone ? timeZone : "Asia/Kolkata",
      language: "en",
    },
    eventTypeId,
    metadata: {
      city: clean.city,
      referralId: clean.referralId,
      service,
    },
  };

  try {
    const response = await fetch(`${CAL_API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { ...calHeaders(CAL_BOOKINGS_API_VERSION), "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      console.error("Cal.com booking failed", result);
      return NextResponse.json({ message: "That time is no longer available. Please choose another slot." }, { status: 409 });
    }

    let brochureEmailSent = true;
    try {
      await sendBookingBrochure({ name: clean.name, email: clean.email, service });
    } catch (error) {
      // A confirmed calendar booking must not be reported as failed if its follow-up email has a transient error.
      console.error("Booking brochure email error", error);
      brochureEmailSent = false;
    }

    return NextResponse.json({ success: true, booking: result.data, brochureEmailSent });
  } catch (error) {
    console.error("Cal.com booking error", error);
    return NextResponse.json({ message: "Unable to create the booking right now." }, { status: 502 });
  }
}
