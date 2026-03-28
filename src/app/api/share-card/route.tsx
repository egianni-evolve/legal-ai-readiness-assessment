import { ImageResponse } from "next/og";
import { createServerClient } from "@supabase/ssr";
import { MATURITY_BANDS } from "@/lib/constants";
import type { MaturityLevel } from "@/lib/types";

export const runtime = "edge";

function getMaturityLabel(level: MaturityLevel): string {
  const band = MATURITY_BANDS.find((b) => b.level === level);
  return band?.label ?? "Unknown";
}

function getScoreDisplay(score: number): string {
  return `${score} / 5.0`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing assessment ID", { status: 400 });
  }

  // Validate UUID
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return new Response("Invalid ID", { status: 400 });
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

  const { data, error } = await supabase
    .from("assessments")
    .select("overall_score, maturity_level, scores")
    .eq("id", id)
    .single();

  if (error || !data) {
    return new Response("Assessment not found", { status: 404 });
  }

  const maturityLabel = getMaturityLabel(data.maturity_level as MaturityLevel);
  const scoreDisplay = getScoreDisplay(data.overall_score);
  const scorePercent = ((data.overall_score - 1) / 4) * 100;
  const strongest = data.scores?.strongest?.name ?? "N/A";
  const focusArea = data.scores?.lowest?.[0]?.name ?? "N/A";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111D33",
          fontFamily: "Georgia, serif",
          padding: "60px",
        }}
      >
        {/* Top label */}
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            color: "#C9A84C",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          AI Readiness Level
        </div>

        {/* Maturity label */}
        <div
          style={{
            display: "flex",
            fontSize: "64px",
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: "12px",
          }}
        >
          {maturityLabel}
        </div>

        {/* Score bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "40px",
            width: "400px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#C9953E",
              marginBottom: "12px",
            }}
          >
            {scoreDisplay}
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "12px",
              backgroundColor: "#243352",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                width: `${scorePercent}%`,
                height: "100%",
                backgroundColor: "#C9953E",
                borderRadius: "6px",
              }}
            />
          </div>
        </div>

        {/* Details row */}
        <div
          style={{
            display: "flex",
            gap: "80px",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "13px",
                color: "#C9A84C",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Strongest
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                color: "#C5CDD8",
              }}
            >
              {strongest}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "13px",
                color: "#C9A84C",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Focus Area
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                color: "#C5CDD8",
              }}
            >
              {focusArea}
            </div>
          </div>
        </div>

        {/* Branding */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1B2C4E",
            backgroundColor: "#C9A84C",
            padding: "8px 24px",
            borderRadius: "4px",
          }}
        >
          LawLab AI
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
