import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { isValidEmail, isValidPhone, isWithinLength, sanitizeFormData } from "@/lib/sanitize";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, businessName, businessType, selectedPlan, message, sellerId } = body;

  const required = [name, email, phone, businessName, businessType, selectedPlan, message];
  if (!required.every((value) => typeof value === "string" && value.trim())) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  if (!isValidEmail(email as string) || !isValidPhone(phone as string)) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address and phone number." },
      { status: 400 },
    );
  }

  if (!(required as string[]).slice(0, 6).every((value) => isWithinLength(value, 150)) || !isWithinLength(message as string, 2000)) {
    return NextResponse.json({ success: false, error: "One or more fields are too long." }, { status: 400 });
  }

  const clean = sanitizeFormData({
    name: name as string,
    email: email as string,
    phone: phone as string,
    businessName: businessName as string,
    businessType: businessType as string,
    selectedPlan: selectedPlan as string,
    message: message as string,
    sellerId: typeof sellerId === "string" ? sellerId : "",
  });

  try {
    const { data, error } = await supabase.from("website_enquiries").insert([
      {
        name: clean.name,
        email: clean.email,
        phone: clean.phone,
        business_name: clean.businessName,
        business_type: clean.businessType,
        selected_plan: clean.selectedPlan,
        message: clean.message,
        sales_executive: clean.sellerId || null,
        status: "New",
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
