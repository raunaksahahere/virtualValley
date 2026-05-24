import fs from "node:fs";
import path from "node:path";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import { NextRequest, NextResponse } from "next/server";

import { renderEmailShell, renderRows } from "@/lib/email";
import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";

type CertificateRecord = {
  cert_id: string;
  intern_name: string;
  intern_email: string;
  duration: string;
  issue_date: string;
  score_targeting_clients: number;
  score_pitching_product: number;
  score_client_handling: number;
  score_closing_deals: number;
  score_professionalism_teamwork: number;
  total_score: number;
};

type WebhookPayload = {
  record?: Partial<CertificateRecord>;
  new?: Partial<CertificateRecord>;
  new_record?: Partial<CertificateRecord>;
};

type DatabaseCertificateRecord = CertificateRecord & {
  created_at?: string;
};

const CERTIFICATE_TEMPLATE_PATH = path.join(
  process.cwd(),
  "public",
  "certificate-template.png",
);

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://thevirtualvalley.com";

function formatIssueDate(issueDate: string) {
  const parsedDate = new Date(issueDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return issueDate;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getCertificateRecord(payload: WebhookPayload) {
  const record = payload.record ?? payload.new ?? payload.new_record;

  if (!record?.cert_id || !record.intern_name || !record.intern_email) {
    return null;
  }

  return record as Pick<CertificateRecord, "cert_id" | "intern_name" | "intern_email">;
}

async function deleteLowScoreCertificate(certId: string) {
  const { error } = await supabase
    .from("certificates")
    .delete()
    .eq("cert_id", certId);

  if (error) {
    throw error;
  }
}

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");

  if (!process.env.CERTIFICATE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook secret is not configured" },
      { status: 500 },
    );
  }

  if (secret !== process.env.CERTIFICATE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 500 },
    );
  }

  const payload = (await req.json()) as WebhookPayload;
  const record = getCertificateRecord(payload);

  if (!record) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { data: certificateRow, error: certificateError } = await supabase
    .from("certificates")
    .select("*")
    .eq("cert_id", record.cert_id)
    .maybeSingle();

  if (certificateError) {
    console.error("Certificate lookup failed:", certificateError);

    return NextResponse.json(
      { error: "Certificate lookup failed" },
      { status: 500 },
    );
  }

  const resolvedRecord: DatabaseCertificateRecord = {
    ...record,
    ...(certificateRow ?? {}),
  } as DatabaseCertificateRecord;

  const minScore = Number.parseInt(process.env.CERTIFICATE_MIN_SCORE ?? "0", 10);

  if (minScore > 0 && Number(resolvedRecord.total_score) < minScore) {
    await deleteLowScoreCertificate(resolvedRecord.cert_id);

    return NextResponse.json({
      success: true,
      skipped: true,
      reason: "Certificate deleted because total score was below the configured minimum.",
      cert_id: resolvedRecord.cert_id,
    });
  }

  if (
    !resolvedRecord.duration ||
    !resolvedRecord.issue_date ||
    typeof resolvedRecord.score_targeting_clients !== "number" ||
    typeof resolvedRecord.score_pitching_product !== "number" ||
    typeof resolvedRecord.score_client_handling !== "number" ||
    typeof resolvedRecord.score_closing_deals !== "number" ||
    typeof resolvedRecord.score_professionalism_teamwork !== "number" ||
    typeof resolvedRecord.total_score !== "number"
  ) {
    return NextResponse.json(
      { error: "Certificate data is incomplete" },
      { status: 400 },
    );
  }

  const verifyUrl = `${siteUrl}/verify/${resolvedRecord.cert_id}`;
  const issueDate = formatIssueDate(resolvedRecord.issue_date);

  try {
    const templateBytes = fs.readFileSync(CERTIFICATE_TEMPLATE_PATH);
    const qrBuffer = await QRCode.toBuffer(verifyUrl, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 150,
      color: {
        dark: "#1B2A6B",
        light: "#FFFFFF",
      },
    });

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([841.89, 595.28]);
    const { width, height } = page.getSize();
    const templateImage = await pdfDoc.embedPng(templateBytes);

    page.drawImage(templateImage, {
      x: 0,
      y: 0,
      width,
      height,
    });

    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const navyBlue = rgb(0.106, 0.165, 0.42);
    const darkNavy = rgb(0.059, 0.098, 0.267);

    const nameText = resolvedRecord.intern_name;
    const nameFontSize = 36;
    const nameWidth = timesRomanBold.widthOfTextAtSize(nameText, nameFontSize);

    page.drawText(nameText, {
      x: (width - nameWidth) / 2,
      y: 330,
      size: nameFontSize,
      font: timesRomanBold,
      color: darkNavy,
    });

    page.drawText(resolvedRecord.cert_id, {
      x: 58,
      y: 178,
      size: 11,
      font: helveticaBold,
      color: navyBlue,
    });

    const dateWidth = helvetica.widthOfTextAtSize(issueDate, 10);

    page.drawText(issueDate, {
      x: (width - dateWidth) / 2,
      y: 108,
      size: 10,
      font: helvetica,
      color: navyBlue,
    });

    page.drawText(resolvedRecord.duration, {
      x: 340,
      y: 295,
      size: 11,
      font: timesRoman,
      color: navyBlue,
    });

    const scores = [
      resolvedRecord.score_targeting_clients,
      resolvedRecord.score_pitching_product,
      resolvedRecord.score_client_handling,
      resolvedRecord.score_closing_deals,
      resolvedRecord.score_professionalism_teamwork,
    ];

    const scoreStartY = 245;
    const scoreRowHeight = 22;
    const scoreX = 670;

    scores.forEach((score, index) => {
      page.drawText(String(score), {
        x: scoreX,
        y: scoreStartY - index * scoreRowHeight,
        size: 12,
        font: helveticaBold,
        color: navyBlue,
      });
    });

    page.drawText(String(resolvedRecord.total_score), {
      x: scoreX,
      y: scoreStartY - 5 * scoreRowHeight,
      size: 13,
      font: helveticaBold,
      color: darkNavy,
    });

    const qrImage = await pdfDoc.embedPng(qrBuffer);

    page.drawImage(qrImage, {
      x: 58,
      y: 65,
      width: 80,
      height: 80,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);
    const certificateFilename = `VirtualValley-Certificate-${record.cert_id}.pdf`;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: resolvedRecord.intern_email,
      subject: "Your Internship Certificate — Virtual Valley",
      html: renderEmailShell(
        "Your Internship Certificate is Ready",
        `
          <p style="margin:0 0 18px;">Hi ${resolvedRecord.intern_name},</p>
          <p style="margin:0 0 18px;">
            Your Virtual Valley internship certificate is attached to this email as a PDF.
            You can also verify it anytime using the button below.
          </p>
          ${renderRows([
            { label: "Certificate ID", value: resolvedRecord.cert_id },
            { label: "Duration", value: resolvedRecord.duration },
            { label: "Issue Date", value: issueDate },
            { label: "Total Score", value: `${resolvedRecord.total_score} / 100` },
          ])}
          <div style="margin-top:24px;">
            <a href="${verifyUrl}" style="display:inline-block;background:#C9A84C;color:#000000;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700;">Verify Certificate</a>
          </div>
          <p style="margin:18px 0 0;color:#BDBDBD;font-size:13px;">${verifyUrl}</p>
        `,
      ),
      attachments: [
        {
          filename: certificateFilename,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    if (process.env.ADMIN_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: process.env.ADMIN_EMAIL,
          subject: `Certificate Sent — ${resolvedRecord.intern_name} (${resolvedRecord.cert_id})`,
          html: renderEmailShell(
            "Certificate Sent Automatically",
            `
              <p style="margin:0 0 18px;">A certificate has been generated and emailed successfully.</p>
              ${renderRows([
                { label: "Name", value: resolvedRecord.intern_name },
                { label: "Email", value: resolvedRecord.intern_email },
                { label: "Certificate ID", value: resolvedRecord.cert_id },
                { label: "Duration", value: resolvedRecord.duration },
                { label: "Total Score", value: `${resolvedRecord.total_score} / 100` },
                { label: "Issue Date", value: issueDate },
              ])}
              <p style="margin:18px 0 0;">${verifyUrl}</p>
            `,
          ),
        });
      } catch (adminError) {
        console.error("Certificate admin notification failed:", adminError);
      }
    }

    return NextResponse.json({
      success: true,
      cert_id: resolvedRecord.cert_id,
    });
  } catch (error) {
    console.error("Certificate generation error:", error);

    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 },
    );
  }
}
