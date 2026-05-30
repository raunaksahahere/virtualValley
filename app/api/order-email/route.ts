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
} from "@/lib/sanitize";

type OrderPayload = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  projectDetails?: unknown;
  selectedPackage?: {
    name?: unknown;
    price?: unknown;
    packageType?: unknown;
    serviceType?: unknown;
  };
  isMonthly?: boolean;
  website?: unknown;
};

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

  let body: OrderPayload;
  try {
    const parsed = await request.json();

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return errorResponse("Invalid request body", 400, corsHeaders);
    }

    body = parsed as OrderPayload;
  } catch {
    return errorResponse("Invalid request body", 400, corsHeaders);
  }

  const honeypot = typeof body.website === "string" ? body.website : undefined;

  if (isBotSubmission(honeypot)) {
    return NextResponse.json(
      { message: "Enquiry submitted successfully.", success: true },
      { status: 200, headers: corsHeaders },
    );
  }

  const selectedPackage = body.selectedPackage;

  if (
    typeof body.fullName !== "string" ||
    typeof body.email !== "string" ||
    typeof body.phone !== "string" ||
    (typeof body.company !== "undefined" && typeof body.company !== "string") ||
    typeof body.projectDetails !== "string" ||
    !selectedPackage ||
    typeof selectedPackage !== "object" ||
    typeof selectedPackage.name !== "string" ||
    typeof selectedPackage.price !== "string" ||
    typeof selectedPackage.packageType !== "string" ||
    typeof selectedPackage.serviceType !== "string" ||
    !body.fullName.trim() ||
    !body.email.trim() ||
    !body.phone.trim() ||
    !body.projectDetails.trim() ||
    !selectedPackage.name.trim() ||
    !selectedPackage.price.trim() ||
    !selectedPackage.packageType.trim() ||
    !selectedPackage.serviceType.trim()
  ) {
    return errorResponse("All enquiry fields are required.", 400, corsHeaders);
  }

  const fullName = body.fullName;
  const email = body.email;
  const phone = body.phone;
  const company = body.company ?? "";
  const projectDetails = body.projectDetails;
  const packageName = selectedPackage.name;
  const packagePrice = selectedPackage.price;
  const packageType = selectedPackage.packageType;
  const serviceType = selectedPackage.serviceType;

  if (!isValidEmail(email)) {
    return errorResponse("Invalid email address.", 400, corsHeaders);
  }

  if (!isValidPhone(phone)) {
    return errorResponse("Invalid phone number.", 400, corsHeaders);
  }

  if (
    !isWithinLength(fullName, 100) ||
    !isWithinLength(projectDetails, 2000) ||
    !isWithinLength(packageName, 100) ||
    !isWithinLength(packageType, 100) ||
    !isWithinLength(serviceType, 100) ||
    !isWithinLength(packagePrice, 100) ||
    (company ? !isWithinLength(company, 100) : false)
  ) {
    return errorResponse("Input exceeds maximum length.", 400, corsHeaders);
  }

  const clean = sanitizeFormData({
    fullName,
    email,
    phone,
    company,
    projectDetails,
  });
  const cleanPackage = sanitizeFormData({
    name: packageName,
    price: packagePrice,
    packageType,
    serviceType,
  });

  if (!hasEmailConfig()) {
    return errorResponse("Email service is not configured.", 500, corsHeaders);
  }

  try {
    const paymentNote =
      cleanPackage.serviceType === "social"
        ? "Advance payment is required before social media management begins."
        : "Payment structure: 50% before work begins and 50% on delivery.";

    const adminHtml = renderEmailShell(
      `New Enquiry: ${cleanPackage.name} - ${clean.fullName}`,
      renderRows([
        { label: "Name", value: clean.fullName },
        { label: "Email", value: clean.email },
        { label: "Phone", value: clean.phone },
        { label: "Company", value: clean.company || "Not provided" },
        { label: "Package Name", value: cleanPackage.name },
        { label: "Package Type", value: cleanPackage.packageType },
        { label: "Service Type", value: cleanPackage.serviceType },
        { label: "Billing Cycle", value: body.isMonthly ? "28 Days" : "Standard" },
        { label: "Project Details", value: clean.projectDetails },
      ]),
    );

    const userHtml = renderEmailShell(
      "Your Enquiry is Confirmed - Virtual Valley",
      `
        <p style="margin:0 0 18px;">Hi ${clean.fullName},</p>
        <p style="margin:0 0 18px;">Thank you for contacting Virtual Valley. Your enquiry has been received and our team will review it carefully.</p>
        ${renderRows([
          { label: "Selected Package", value: cleanPackage.name },
          {
            label: "Package Type",
            value: cleanPackage.packageType,
          },
          {
            label: "Service Type",
            value: cleanPackage.serviceType,
          },
          { label: "Quoted Price", value: `INR ${cleanPackage.price}` },
          { label: "Payment Note", value: paymentNote },
        ])}
        <p style="margin:18px 0 0;">We aim to respond within 24 hours with the next steps.</p>
      `,
    );

    await Promise.all([
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.ADMIN_EMAIL!,
        subject: `New Enquiry: ${cleanPackage.name} - ${clean.fullName}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: clean.email,
        subject: "Your Enquiry is Confirmed - Virtual Valley",
        html: userHtml,
      }),
    ]);

    return NextResponse.json(
      { message: "Enquiry submitted successfully.", success: true },
      { status: 200, headers: corsHeaders },
    );
  } catch (error) {
    console.error("Order email send error:", error);
    return errorResponse("Unable to submit your enquiry right now.", 500, corsHeaders);
  }
}
