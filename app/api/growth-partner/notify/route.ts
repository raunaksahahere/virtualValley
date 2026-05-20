import { NextResponse } from "next/server";

import { hasEmailConfig, renderEmailShell } from "@/lib/email";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      subject?: string;
      message?: string;
    };

    if (!body.subject || !body.message) {
      return NextResponse.json(
        { message: "Subject and message are required." },
        { status: 400 },
      );
    }

    if (!hasEmailConfig()) {
      return NextResponse.json(
        { message: "Email service is not configured." },
        { status: 500 },
      );
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: body.subject,
      html: renderEmailShell(body.subject, `<p>${body.message}</p>`),
    });

    return NextResponse.json({ message: "Notification sent successfully." });
  } catch {
    return NextResponse.json(
      { message: "Unable to send notification right now." },
      { status: 500 },
    );
  }
}
