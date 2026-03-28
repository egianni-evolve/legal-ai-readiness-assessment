import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

function validateEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  // Basic email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUUID(id: unknown): boolean {
  if (typeof id !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, assessmentId, firmSize, maturityLevel } = body;

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Valid email address required." },
        { status: 400 }
      );
    }

    if (assessmentId && !validateUUID(assessmentId)) {
      return NextResponse.json(
        { error: "Invalid assessment ID." },
        { status: 400 }
      );
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return [];
          },
          setAll() {},
        },
      }
    );

    const { error } = await supabase.from("leads").insert({
      email,
      assessment_id: assessmentId || null,
      firm_size: firmSize || null,
      maturity_level: maturityLevel || null,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to save." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
