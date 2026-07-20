import { NextRequest, NextResponse } from "next/server";

import {
  CAL_API_BASE_URL,
  CAL_SLOTS_API_VERSION,
  calHeaders,
  getCalEventTypeId,
  isCalService,
} from "@/lib/cal";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service") ?? "";
  const date = searchParams.get("date") ?? "";
  const timeZone = searchParams.get("timeZone") || "Asia/Kolkata";

  if (!isCalService(service) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ message: "A valid service and date are required." }, { status: 400 });
  }

  if (!process.env.CAL_API_KEY) {
    return NextResponse.json({ message: "Calendar service is not configured." }, { status: 503 });
  }

  const eventTypeId = getCalEventTypeId(service);
  if (!eventTypeId) {
    return NextResponse.json({ message: `Calendar is not configured for ${service}.` }, { status: 503 });
  }

  const params = new URLSearchParams({
    eventTypeId: String(eventTypeId),
    start: date,
    end: date,
    timeZone,
  });

  try {
    const response = await fetch(`${CAL_API_BASE_URL}/slots?${params}`, {
      headers: calHeaders(CAL_SLOTS_API_VERSION),
      cache: "no-store",
    });
    const payload = await response.json();

    if (!response.ok || payload.status !== "success") {
      console.error("Cal.com slot lookup failed", payload);
      return NextResponse.json({ message: "Unable to load available times." }, { status: 502 });
    }

    const slots = Array.isArray(payload.data?.[date])
      ? payload.data[date].map((slot: { start?: string }) => slot.start).filter(Boolean)
      : [];

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Cal.com slot lookup error", error);
    return NextResponse.json({ message: "Unable to load available times." }, { status: 502 });
  }
}
