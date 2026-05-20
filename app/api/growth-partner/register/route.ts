import { NextResponse } from "next/server";

import { hasEmailConfig, renderEmailShell, renderRows } from "@/lib/email";
import { resend } from "@/lib/resend";

type GrowthPartnerPayload = Record<string, string | undefined>;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GrowthPartnerPayload;

    if (!body.name || !body.email || !body.phone || !body.city) {
      return NextResponse.json(
        { message: "Name, email, phone, and city are required." },
        { status: 400 },
      );
    }

    if (!hasEmailConfig()) {
      return NextResponse.json(
        { message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const rows = Object.entries(body)
      .filter((entry): entry is [string, string] => Boolean(entry[1]))
      .map(([label, value]) => ({
        label: label.replace(/([A-Z])/g, " $1").trim(),
        value,
      }));

    const html = renderEmailShell(
      `New Growth Partner Registration - ${body.name}`,
      renderRows(rows),
    );

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Growth Partner Registration - ${body.name}`,
      html,
    });

    return NextResponse.json({ message: "Registration submitted successfully." });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit registration right now." },
      { status: 500 },
    );
  }
}
