import { NextResponse } from "next/server";

import { renderEmailShell, renderRows, hasEmailConfig } from "@/lib/email";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { message: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!hasEmailConfig()) {
      return NextResponse.json(
        { message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const html = renderEmailShell(
      `New Contact Message from ${body.name}`,
      renderRows([
        { label: "Name", value: body.name },
        { label: "Email", value: body.email },
        { label: "Message", value: body.message },
        {
          label: "Timestamp",
          value: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
      ]),
    );

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Message from ${body.name}`,
      html,
    });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch {
    return NextResponse.json(
      { message: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
