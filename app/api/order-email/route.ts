import { NextResponse } from "next/server";

import { hasEmailConfig, renderEmailShell, renderRows } from "@/lib/email";
import { resend } from "@/lib/resend";

type OrderPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  projectDetails?: string;
  selectedPackage?: {
    name?: string;
    price?: string;
    packageType?: string;
    serviceType?: string;
  };
  isMonthly?: boolean;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderPayload;

    if (
      !body.fullName ||
      !body.email ||
      !body.phone ||
      !body.company ||
      !body.projectDetails ||
      !body.selectedPackage?.name ||
      !body.selectedPackage?.price ||
      !body.selectedPackage?.packageType ||
      !body.selectedPackage?.serviceType
    ) {
      return NextResponse.json(
        { message: "All enquiry fields are required." },
        { status: 400 },
      );
    }

    if (!hasEmailConfig()) {
      return NextResponse.json(
        { message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const paymentNote =
      body.selectedPackage.serviceType === "social"
        ? "Advance payment is required before social media management begins."
        : "Payment structure: 50% before work begins and 50% on delivery.";

    const adminHtml = renderEmailShell(
      `New Enquiry: ${body.selectedPackage.name} - ${body.fullName}`,
      renderRows([
        { label: "Name", value: body.fullName },
        { label: "Email", value: body.email },
        { label: "Phone", value: body.phone },
        { label: "Company", value: body.company },
        { label: "Package Name", value: body.selectedPackage.name },
        { label: "Package Type", value: body.selectedPackage.packageType },
        { label: "Service Type", value: body.selectedPackage.serviceType },
        { label: "Billing Cycle", value: body.isMonthly ? "28 Days" : "Standard" },
        { label: "Project Details", value: body.projectDetails },
      ]),
    );

    const userHtml = renderEmailShell(
      "Your Enquiry is Confirmed - Virtual Valley",
      `
        <p style="margin:0 0 18px;">Hi ${body.fullName},</p>
        <p style="margin:0 0 18px;">Thank you for contacting Virtual Valley. Your enquiry has been received and our team will review it carefully.</p>
        ${renderRows([
          { label: "Selected Package", value: body.selectedPackage.name },
          {
            label: "Package Type",
            value: body.selectedPackage.packageType,
          },
          {
            label: "Service Type",
            value: body.selectedPackage.serviceType,
          },
          { label: "Quoted Price", value: `INR ${body.selectedPackage.price}` },
          { label: "Payment Note", value: paymentNote },
        ])}
        <p style="margin:18px 0 0;">We aim to respond within 24 hours with the next steps.</p>
      `,
    );

    await Promise.all([
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.ADMIN_EMAIL!,
        subject: `New Enquiry: ${body.selectedPackage.name} - ${body.fullName}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: body.email,
        subject: "Your Enquiry is Confirmed - Virtual Valley",
        html: userHtml,
      }),
    ]);

    return NextResponse.json({ message: "Enquiry submitted successfully." });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit your enquiry right now." },
      { status: 500 },
    );
  }
}
