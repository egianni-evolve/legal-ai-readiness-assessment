import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { scoreAssessment } from "@/lib/scoring";
import type { FirmSize, Answers } from "@/lib/types";

const VALID_FIRM_SIZES: FirmSize[] = ["solo", "small", "mid", "large"];

function validateAnswers(answers: unknown): answers is Answers {
  if (typeof answers !== "object" || answers === null) return false;

  const entries = Object.entries(answers as Record<string, unknown>);
  if (entries.length !== 25) return false;

  for (const [key, value] of entries) {
    const id = Number(key);
    if (isNaN(id) || id < 1 || id > 25) return false;
    if (typeof value !== "number" || value < 1 || value > 5) return false;
    if (!Number.isInteger(value)) return false;
  }

  return true;
}

function validateFirmSize(size: unknown): size is FirmSize {
  return typeof size === "string" && VALID_FIRM_SIZES.includes(size as FirmSize);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, firmSize } = body;

    // Server-side validation (Security Rule 19)
    if (!validateAnswers(answers)) {
      return NextResponse.json(
        { error: "Invalid answers. All 25 questions must be answered with values 1-5." },
        { status: 400 }
      );
    }

    if (!validateFirmSize(firmSize)) {
      return NextResponse.json(
        { error: "Invalid firm size." },
        { status: 400 }
      );
    }

    // Score the assessment server-side (Security Rule 19)
    const results = scoreAssessment(answers);

    // Create Supabase client for server-side use
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

    // Insert assessment (Security Rule 08 - parameterized via SDK)
    const { data, error } = await supabase
      .from("assessments")
      .insert({
        firm_size: firmSize,
        answers,
        scores: {
          dimensions: results.dimensionScores,
          sorted: results.sortedDimensions,
          lowest: results.lowestDimensions,
          strongest: results.strongestDimension,
        },
        overall_score: results.overallScore,
        maturity_level: results.maturityLevel,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to save assessment.", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      ...results,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request.", details: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
