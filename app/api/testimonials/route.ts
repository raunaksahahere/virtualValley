import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, review } = body;

    if (!name || !email || !service || !review) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (review.length < 20 || review.length > 800) {
      return NextResponse.json({ error: "Review length must be between 20 and 800 characters" }, { status: 400 });
    }

    const { error } = await supabase
      .from("testimonials")
      .insert([
        {
          name,
          email,
          service,
          review,
          status: "pending",
        }
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Testimonial submission error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
