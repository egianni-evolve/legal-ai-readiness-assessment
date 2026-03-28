import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { Resend } from "resend";
import { MATURITY_BANDS } from "@/lib/constants";
import type { MaturityLevel } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

function validateEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUUID(id: unknown): boolean {
  if (typeof id !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id
  );
}

function getMaturityLabel(level: MaturityLevel): string {
  const band = MATURITY_BANDS.find((b) => b.level === level);
  return band?.label ?? "Unknown";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, assessmentId } = body;

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Valid email address required." },
        { status: 400 }
      );
    }

    if (!assessmentId || !validateUUID(assessmentId)) {
      return NextResponse.json(
        { error: "Invalid assessment ID." },
        { status: 400 }
      );
    }

    // Fetch assessment data
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

    const { data: assessment, error: dbError } = await supabase
      .from("assessments")
      .select("*")
      .eq("id", assessmentId)
      .single();

    if (dbError || !assessment) {
      return NextResponse.json(
        { error: "Assessment not found." },
        { status: 404 }
      );
    }

    const maturityLabel = getMaturityLabel(
      assessment.maturity_level as MaturityLevel
    );
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://lawlab.ai";
    const resultsUrl = `${baseUrl}/results/${assessmentId}`;
    const strongest = assessment.scores?.strongest?.name ?? "N/A";
    const focusArea = assessment.scores?.lowest?.[0]?.name ?? "N/A";

    // Save lead
    await supabase.from("leads").insert({
      email,
      assessment_id: assessmentId,
      firm_size: assessment.firm_size,
      maturity_level: assessment.maturity_level,
    });

    // Send email
    const { error: emailError } = await resend.emails.send({
      from: "LawLab AI <onboarding@resend.dev>",
      to: email,
      subject: `Your AI Readiness Results: ${maturityLabel}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #111D33; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #111D33; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom: 32px;">
              <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: bold; color: #FFFFFF;">LawLab AI</span>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding-bottom: 24px;">
              <p style="color: #C5CDD8; font-size: 16px; line-height: 1.6; margin: 0;">
                Thank you for completing the Legal AI Readiness Assessment. Here is a summary of your results.
              </p>
            </td>
          </tr>

          <!-- Results Card -->
          <tr>
            <td style="background-color: #1A2744; border-radius: 12px; padding: 32px; text-align: center;">
              <p style="color: #C9A84C; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 12px 0;">AI Readiness Level</p>
              <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 36px; font-weight: bold; color: #FFFFFF; margin: 0 0 8px 0;">${maturityLabel}</h1>
              <p style="color: #C9953E; font-size: 24px; font-weight: bold; margin: 0 0 24px 0;">${assessment.overall_score} / 5.0</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="text-align: center; padding: 12px;">
                    <p style="color: #C9A84C; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 4px 0;">Strongest</p>
                    <p style="color: #C5CDD8; font-size: 15px; margin: 0;">${strongest}</p>
                  </td>
                  <td width="50%" style="text-align: center; padding: 12px;">
                    <p style="color: #C9A84C; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 4px 0;">Focus Area</p>
                    <p style="color: #C5CDD8; font-size: 15px; margin: 0;">${focusArea}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- View Results Button -->
          <tr>
            <td style="padding: 32px 0; text-align: center;">
              <a href="${resultsUrl}" style="display: inline-block; background-color: #C9953E; color: #111D33; font-weight: bold; font-size: 16px; text-decoration: none; padding: 14px 32px; border-radius: 6px;">View Your Full Results</a>
            </td>
          </tr>

          <!-- Consultation CTA -->
          <tr>
            <td style="background-color: #1A2744; border-radius: 12px; padding: 24px; text-align: center;">
              <p style="color: #FFFFFF; font-size: 16px; font-weight: bold; margin: 0 0 8px 0;">Want help building your AI readiness roadmap?</p>
              <p style="color: #C5CDD8; font-size: 14px; line-height: 1.5; margin: 0 0 16px 0;">Book a consultation with our team to discuss your results and prioritize next steps.</p>
              <a href="https://lawlab.ai/" style="display: inline-block; border: 2px solid #C9953E; color: #C9953E; font-weight: bold; font-size: 14px; text-decoration: none; padding: 10px 24px; border-radius: 6px;">Book a Consultation</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 32px; border-top: 1px solid #243352; margin-top: 32px;">
              <p style="color: #8A95A8; font-size: 12px; margin: 24px 0 0 0;">
                &copy; 2026 LawLab AI, LLC. All rights reserved.
              </p>
              <p style="color: #8A95A8; font-size: 11px; margin: 8px 0 0 0;">
                You received this email because you requested your AI Readiness Assessment results. If you did not request this, you can safely ignore this message.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (emailError) {
      return NextResponse.json(
        { error: "Failed to send email." },
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
