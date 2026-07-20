// Handles Supabase certificate webhooks by filling the PNG template with canvas, wrapping it in a PDF, and emailing it with Resend.
import fs from "node:fs";
import path from "node:path";

import {
  createCanvas,
  loadImage,
  registerFont,
} from "@napi-rs/canvas/node-canvas";
import { PDFDocument } from "pdf-lib";
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

type CertificateIdentity = Pick<
  CertificateRecord,
  "cert_id" | "intern_name" | "intern_email"
>;

type FontStyle = {
  family: string;
  weight: "normal" | "bold";
};

type CertificateCanvasContext = {
  font: string;
  fillStyle: string | CanvasGradient | CanvasPattern;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  imageSmoothingEnabled: boolean;
  imageSmoothingQuality: ImageSmoothingQuality;
  measureText(text: string): Pick<
    TextMetrics,
    "actualBoundingBoxAscent" | "actualBoundingBoxDescent" | "width"
  >;
  fillText(text: string, x: number, y: number): void;
  drawImage(
    image: unknown,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void;
};

const CERTIFICATE_TEMPLATE_PATH = path.join(
  process.cwd(),
  "public",
  "certificate-template.png",
);

const TEMPLATE_WIDTH = 1086;
const TEMPLATE_HEIGHT = 1448;
const PDF_WIDTH = (TEMPLATE_WIDTH / 300) * 72;
const PDF_HEIGHT = (TEMPLATE_HEIGHT / 300) * 72;

const NAME_CX = 543;
const NAME_CY = 510;
const NAME_FONT_SIZE = 52;
const NAME_COLOR = "rgb(10, 25, 64)";

const SCORE_RIGHT_X = 763;
const SCORE_YS = [780, 824, 866, 908, 949];
const SCORE_FONT_SIZE = 24;
const SCORE_COLOR = "rgb(10, 25, 64)";

const TOTAL_RIGHT_X = 758;
const TOTAL_Y = 996;
const TOTAL_COLOR = "rgb(255, 255, 255)";

const CERT_ID_CX = 282;
const CERT_ID_CY = 1115;
const DATE_CX = 802;
const DATE_CY = 1115;

const BOX_FONT_SIZE = 22;
const BOX_COLOR = "rgb(10, 25, 64)";

const QR_BOX_X1 = 426;
const QR_BOX_Y1 = 1045;
const QR_BOX_X2 = 587;
const QR_BOX_Y2 = 1141;
const QR_SIZE = Math.min(QR_BOX_X2 - QR_BOX_X1, QR_BOX_Y2 - QR_BOX_Y1) - 6;
const QR_PASTE_X =
  QR_BOX_X1 + Math.floor((QR_BOX_X2 - QR_BOX_X1 - QR_SIZE) / 2) + 30;
const QR_PASTE_Y =
  QR_BOX_Y1 + Math.floor((QR_BOX_Y2 - QR_BOX_Y1 - QR_SIZE) / 2);

const FONT_PATHS = {
  bold: [
    path.join(process.cwd(), "public/fonts/DejaVuSerif-Bold.ttf"),
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
  ],
  regular: [
    path.join(process.cwd(), "public/fonts/DejaVuSerif.ttf"),
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
  ],
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://thevirtualvalley.com";

let loadedFonts: { bold: FontStyle; regular: FontStyle } | null = null;

export const runtime = "nodejs";

function ok(body: Record<string, unknown>) {
  return NextResponse.json(body, { status: 200 });
}

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

  return record as CertificateIdentity;
}

function loadFont(
  size: number,
  bold: boolean,
  fonts: { bold: FontStyle; regular: FontStyle },
) {
  const font = bold ? fonts.bold : fonts.regular;
  const weight = font.weight === "bold" ? "bold " : "";

  return `${weight}${size}px "${font.family}"`;
}

function getLoadedFonts() {
  if (loadedFonts) {
    return loadedFonts;
  }

  loadedFonts = {
    bold: registerFirstAvailableFont(
      FONT_PATHS.bold,
      "VirtualValleySerifBold",
      "bold",
    ),
    regular: registerFirstAvailableFont(
      FONT_PATHS.regular,
      "VirtualValleySerif",
      "normal",
    ),
  };

  return loadedFonts;
}

function registerFirstAvailableFont(
  candidates: string[],
  family: string,
  weight: "normal" | "bold",
): FontStyle {
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) {
      continue;
    }

    try {
      registerFont(candidate, { family, weight });

      return { family, weight };
    } catch (error) {
      console.error(
        `Certificate font registration failed for ${candidate}:`,
        error,
      );
    }
  }

  return { family: "sans-serif", weight: "normal" };
}

function drawRightAligned(
  ctx: CertificateCanvasContext,
  text: string,
  rightX: number,
  cy: number,
  font: string,
  fill: string,
) {
  ctx.font = font;
  ctx.fillStyle = fill;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const metrics = ctx.measureText(text);
  const height =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  ctx.fillText(text, rightX - metrics.width, cy - Math.floor(height / 2));
}

function drawCentred(
  ctx: CertificateCanvasContext,
  text: string,
  cx: number,
  cy: number,
  font: string,
  fill: string,
) {
  ctx.font = font;
  ctx.fillStyle = fill;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const metrics = ctx.measureText(text);
  const height =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  ctx.fillText(
    text,
    cx - Math.floor(metrics.width / 2),
    cy - Math.floor(height / 2),
  );
}

async function makeQr(data: string) {
  const qrBuffer = await QRCode.toBuffer(data, {
    errorCorrectionLevel: "H",
    margin: 1,
    scale: 3,
    color: {
      dark: "#FAF6EE",
      light: "#FFFFFF",
    },
  });

  return loadImage(qrBuffer);
}

function readRequiredNumber(value: unknown, fieldName: string) {
  const numberValue = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(numberValue)) {
    throw new Error(`Certificate data is incomplete: ${fieldName}`);
  }

  return numberValue;
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

async function renderCertificatePng(
  record: DatabaseCertificateRecord,
  issueDate: string,
  verifyUrl: string,
  scores: number[],
) {
  const templateBytes = fs.readFileSync(CERTIFICATE_TEMPLATE_PATH);
  const templateImage = await loadImage(templateBytes);
  const canvas = createCanvas(TEMPLATE_WIDTH, TEMPLATE_HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(templateImage, 0, 0, TEMPLATE_WIDTH, TEMPLATE_HEIGHT);

  const fonts = getLoadedFonts();
  const nameFont = loadFont(NAME_FONT_SIZE, true, fonts);
  const scoreFont = loadFont(SCORE_FONT_SIZE, true, fonts);
  const boxFont = loadFont(BOX_FONT_SIZE, false, fonts);

  drawCentred(ctx, record.intern_name, NAME_CX, NAME_CY, nameFont, NAME_COLOR);

  scores.forEach((score, index) => {
    drawRightAligned(
      ctx,
      String(score),
      SCORE_RIGHT_X,
      SCORE_YS[index],
      scoreFont,
      SCORE_COLOR,
    );
  });

  drawRightAligned(
    ctx,
    String(scores.reduce((total, score) => total + score, 0)),
    TOTAL_RIGHT_X,
    TOTAL_Y,
    scoreFont,
    TOTAL_COLOR,
  );

  drawCentred(ctx, record.cert_id, CERT_ID_CX, CERT_ID_CY, boxFont, BOX_COLOR);
  drawCentred(ctx, issueDate, DATE_CX, DATE_CY, boxFont, BOX_COLOR);

  const qrImage = await makeQr(verifyUrl);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(qrImage, QR_PASTE_X, QR_PASTE_Y, QR_SIZE, QR_SIZE);

  return canvas.toBuffer("image/png");
}

async function createCertificatePdf(pngBuffer: Buffer) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([PDF_WIDTH, PDF_HEIGHT]);
  const filledCertificateImage = await pdfDoc.embedPng(pngBuffer);

  page.drawImage(filledCertificateImage, {
    x: 0,
    y: 0,
    width: PDF_WIDTH,
    height: PDF_HEIGHT,
  });

  const pdfBytes = await pdfDoc.save();

  return Buffer.from(pdfBytes);
}

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-webhook-secret");

    if (!process.env.CERTIFICATE_WEBHOOK_SECRET) {
      console.error("Certificate webhook secret is not configured.");

      return ok({ success: false, error: "Webhook secret is not configured" });
    }

    if (secret !== process.env.CERTIFICATE_WEBHOOK_SECRET) {
      console.error(
        "Certificate webhook rejected because the secret did not match.",
      );

      return ok({ success: false, error: "Unauthorized" });
    }

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      console.error("Certificate email service is not configured.");

      return ok({ success: false, error: "Email service is not configured" });
    }

    const payload = (await req.json()) as WebhookPayload;
    const record = getCertificateRecord(payload);

    if (!record) {
      console.error("Certificate webhook payload was invalid.");

      return ok({ success: false, error: "Invalid payload" });
    }

    const { data: certificateRow, error: certificateError } = await supabase
      .from("certificates")
      .select("*")
      .eq("cert_id", record.cert_id)
      .maybeSingle();

    if (certificateError) {
      console.error("Certificate lookup failed:", certificateError);

      return ok({ success: false, error: "Certificate lookup failed" });
    }

    const resolvedRecord: DatabaseCertificateRecord = {
      ...record,
      ...(certificateRow ?? {}),
    } as DatabaseCertificateRecord;

    const scores = [
      readRequiredNumber(
        resolvedRecord.score_targeting_clients,
        "score_targeting_clients",
      ),
      readRequiredNumber(
        resolvedRecord.score_pitching_product,
        "score_pitching_product",
      ),
      readRequiredNumber(
        resolvedRecord.score_client_handling,
        "score_client_handling",
      ),
      readRequiredNumber(
        resolvedRecord.score_closing_deals,
        "score_closing_deals",
      ),
      readRequiredNumber(
        resolvedRecord.score_professionalism_teamwork,
        "score_professionalism_teamwork",
      ),
    ];
    const totalScore = scores.reduce((total, score) => total + score, 0);
    const minScore = Number.parseInt(
      process.env.CERTIFICATE_MIN_SCORE ?? "0",
      10,
    );

    if (minScore > 0 && totalScore < minScore) {
      try {
        await deleteLowScoreCertificate(resolvedRecord.cert_id);
      } catch (deleteError) {
        console.error(
          `Failed to delete low score certificate ${resolvedRecord.cert_id}:`,
          deleteError,
        );
        return ok({ success: false, error: "Failed to delete low score certificate" });
      }

      return ok({
        success: true,
        skipped: true,
        reason:
          "Certificate deleted because total score was below the configured minimum.",
        cert_id: resolvedRecord.cert_id,
      });
    }

    if (!resolvedRecord.duration || !resolvedRecord.issue_date) {
      console.error("Certificate data is incomplete.");

      return ok({ success: false, error: "Certificate data is incomplete" });
    }

    const verifyUrl = `${siteUrl}/verify/${resolvedRecord.cert_id}`;
    const issueDate = formatIssueDate(resolvedRecord.issue_date);
    const pngBuffer = await renderCertificatePng(
      resolvedRecord,
      issueDate,
      verifyUrl,
      scores,
    );
    const pdfBuffer = await createCertificatePdf(pngBuffer);
    const certificateFilename = `VirtualValley-Certificate-${resolvedRecord.cert_id}.pdf`;

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
            { label: "Total Score", value: `${totalScore} / 100` },
          ])}
          <div style="margin-top:24px;">
            <a href="${verifyUrl}" style="display:inline-block;background:#C9A84C;color:#FAF6EE;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700;">Verify Certificate</a>
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
                { label: "Total Score", value: `${totalScore} / 100` },
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

    return ok({
      success: true,
      cert_id: resolvedRecord.cert_id,
    });
  } catch (error) {
    console.error("Certificate generation error:", error);

    return ok({ success: false, error: "Generation failed" });
  }
}
