import { createServerClient } from "@supabase/ssr";
import { notFound } from "next/navigation";
import { DIMENSIONS, MATURITY_BANDS } from "@/lib/constants";
import type { DimensionKey, MaturityLevel } from "@/lib/types";

interface AssessmentRow {
  id: string;
  firm_size: string;
  scores: {
    dimensions: Record<DimensionKey, number>;
    sorted: Array<{
      key: DimensionKey;
      name: string;
      score: number;
      level: MaturityLevel;
      label: string;
    }>;
    lowest: Array<{ key: DimensionKey; name: string; score: number; label: string }>;
    strongest: { key: DimensionKey; name: string; score: number; label: string };
  };
  overall_score: number;
  maturity_level: MaturityLevel;
  created_at: string;
}

function getMaturityLabel(level: MaturityLevel): string {
  const band = MATURITY_BANDS.find((b) => b.level === level);
  return band?.label ?? "Unknown";
}

function getScoreBarWidth(score: number): string {
  return `${((score - 1) / 4) * 100}%`;
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validate UUID format (Security Rule 12)
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
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
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const assessment = data as AssessmentRow;
  const maturityLabel = getMaturityLabel(assessment.maturity_level);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="w-full px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <a href="/" className="font-headline text-xl font-bold text-white">
          LawLab AI<sup className="text-xs">™</sup>
        </a>
      </nav>

      {/* Overall Score */}
      <section className="px-6 py-12 max-w-3xl mx-auto w-full text-center">
        <p className="text-gold-primary font-body text-sm font-bold uppercase tracking-widest mb-4">
          Your AI Readiness Level
        </p>

        <div className="bg-navy rounded-xl p-8 border border-navy-mid">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white">
            {maturityLabel}
          </h1>
          <p className="mt-3 text-2xl text-gold-web font-body font-bold">
            {assessment.overall_score} / 5.0
          </p>
        </div>
      </section>

      {/* Dimension Breakdown */}
      <section className="px-6 py-8 max-w-3xl mx-auto w-full">
        <h2 className="font-headline text-2xl font-bold text-white mb-8">
          Your Dimension Breakdown
        </h2>

        <div className="space-y-6">
          {DIMENSIONS.map((dim) => {
            const score = assessment.scores.dimensions[dim.key];
            const sorted = assessment.scores.sorted?.find(
              (s) => s.key === dim.key
            );
            const label = sorted?.label ?? "";

            return (
              <div key={dim.key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm text-white">
                    {dim.name}
                  </span>
                  <span className="font-body text-sm text-gold-web font-semibold">
                    {score} &middot; {label}
                  </span>
                </div>
                <div className="w-full h-3 bg-navy-mid rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-web rounded-full transition-all duration-700"
                    style={{ width: getScoreBarWidth(score) }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Strongest & Focus Areas */}
      <section className="px-6 py-8 max-w-3xl mx-auto w-full">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-navy rounded-lg p-6 border border-navy-mid">
            <p className="text-gold-primary font-body text-xs font-bold uppercase tracking-widest mb-2">
              Strongest Area
            </p>
            <p className="font-body text-lg font-semibold text-white">
              {assessment.scores.strongest?.name}
            </p>
            <p className="text-muted text-sm mt-1">
              Score: {assessment.scores.strongest?.score}
            </p>
          </div>

          <div className="bg-navy rounded-lg p-6 border border-navy-mid">
            <p className="text-gold-primary font-body text-xs font-bold uppercase tracking-widest mb-2">
              Focus Area
            </p>
            <p className="font-body text-lg font-semibold text-white">
              {assessment.scores.lowest?.[0]?.name}
            </p>
            <p className="text-muted text-sm mt-1">
              Score: {assessment.scores.lowest?.[0]?.score}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Placeholder */}
      <section className="px-6 py-12 max-w-3xl mx-auto w-full text-center">
        <p className="text-body-text mb-6">
          Charts, detailed interpretations, recommendations, and sharing
          features are coming in the next phases.
        </p>
        <a
          href="/"
          className="inline-block bg-gold-web hover:bg-gold-light text-navy-deep font-body font-bold px-8 py-3 rounded transition-colors"
        >
          Back to Home
        </a>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-navy-mid mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-headline text-sm font-bold text-white">
            LawLab AI<sup className="text-xs">™</sup>
          </span>
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} LawLab AI, LLC. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
