import { NextRequest, NextResponse } from "next/server";

import { renderEmailShell, renderRows, hasEmailConfig } from "@/lib/email";
import { resend } from "@/lib/resend";
import { isValidEmail, isValidPhone, isWithinLength, sanitizeFormData } from "@/lib/sanitize";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { fullName, phone, email, city, collegeCompany } = body;
  if (
    typeof fullName !== "string" || typeof phone !== "string" || typeof email !== "string" || typeof city !== "string" ||
    !fullName.trim() || !phone.trim() || !email.trim() || !city.trim()
  ) {
    return NextResponse.json({ message: "Full name, phone number, email address, and city are required." }, { status: 400 });
  }

  if (!isValidEmail(email) || !isValidPhone(phone)) {
    return NextResponse.json({ message: "Please provide a valid email address and phone number." }, { status: 400 });
  }

  const values = [fullName, phone, email, city, typeof collegeCompany === "string" ? collegeCompany : ""];
  if (!values.every((value) => isWithinLength(value, 150))) {
    return NextResponse.json({ message: "One or more fields are too long." }, { status: 400 });
  }

  if (!hasEmailConfig()) {
    return NextResponse.json({ message: "Email service is not configured." }, { status: 503 });
  }

  const clean = sanitizeFormData({
    fullName,
    phone,
    email,
    city,
    collegeCompany: typeof collegeCompany === "string" ? collegeCompany : "",
  });

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Sales Executive application from ${clean.fullName}`,
      html: renderEmailShell(
        `New Sales Executive Application from ${clean.fullName}`,
        renderRows([
          { label: "Full Name", value: clean.fullName },
          { label: "Phone", value: clean.phone },
          { label: "Email", value: clean.email },
          { label: "City", value: clean.city },
          { label: "College / Company", value: clean.collegeCompany || "Not provided" },
          { label: "Timestamp", value: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) },
        ]),
      ),
    });

    return NextResponse.json({ success: true, message: "Application received." });
  } catch (error) {
    console.error("Application email error", error);
    return NextResponse.json({ message: "Unable to submit your application right now." }, { status: 500 });
  }
}
