import { createServerClient } from "@supabase/ssr";
import { notFound } from "next/navigation";
import { DIMENSIONS, MATURITY_BANDS } from "@/lib/constants";
import {
  OVERALL_INTERPRETATIONS,
  DIMENSION_INTERPRETATIONS,
  FIRM_SIZE_MODIFIERS,
  RECOMMENDATIONS,
} from "@/lib/interpretations";
import type { DimensionKey, FirmSize, MaturityLevel } from "@/lib/types";
import RadarChart from "@/components/results/RadarChart";
import DimensionBars from "@/components/results/DimensionBars";
import CopyLinkButton from "@/components/results/CopyLinkButton";

interface AssessmentRow {
  id: string;
  firm_size: FirmSize;
  scores: {
    dimensions: Record<DimensionKey, number>;
    sorted: Array<{
      key: DimensionKey;
      name: string;
      score: number;
      level: MaturityLevel;
      label: string;
    }>;
    lowest: Array<{
      key: DimensionKey;
      name: string;
      score: number;
      label: string;
    }>;
    strongest: {
      key: DimensionKey;
      name: string;
      score: number;
      label: string;
    };
  };
  overall_score: number;
  maturity_level: MaturityLevel;
  created_at: string;
}

function getMaturityLabel(level: MaturityLevel): string {
  const band = MATURITY_BANDS.find((b) => b.level === level);
  return band?.label ?? "Unknown";
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
  const firmSize = assessment.firm_size;

  // Get top 3 recommendations from the 2 lowest dimensions
  const lowest = assessment.scores.lowest || [];
  const recs: Array<{ dimension: string; text: string }> = [];
  for (const dim of lowest.slice(0, 2)) {
    const dimRecs = RECOMMENDATIONS[dim.key]?.[firmSize] || [];
    for (const rec of dimRecs.slice(0, 2)) {
      recs.push({ dimension: dim.name, text: rec });
    }
  }
  const topRecs = recs.slice(0, 3);

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
          <p className="mt-6 text-body-text text-base leading-relaxed max-w-2xl mx-auto">
            {OVERALL_INTERPRETATIONS[assessment.maturity_level]}
          </p>
        </div>
      </section>

      {/* Charts */}
      <section className="px-6 py-8 max-w-4xl mx-auto w-full">
        <h2 className="font-headline text-2xl font-bold text-white mb-8 text-center">
          Your Dimension Breakdown
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-navy rounded-xl p-6 border border-navy-mid">
            <RadarChart dimensionScores={assessment.scores.dimensions} />
          </div>
          <div className="bg-navy rounded-xl p-6 border border-navy-mid">
            <DimensionBars dimensionScores={assessment.scores.dimensions} />
          </div>
        </div>
      </section>

      {/* Per-Dimension Interpretations */}
      <section className="px-6 py-8 max-w-3xl mx-auto w-full">
        <h2 className="font-headline text-2xl font-bold text-white mb-8">
          What This Means
        </h2>

        <div className="space-y-6">
          {(assessment.scores.sorted || []).map((dim) => {
            const interpretation =
              DIMENSION_INTERPRETATIONS[dim.key]?.[dim.level as MaturityLevel] || "";
            const modifier =
              FIRM_SIZE_MODIFIERS[dim.key]?.[firmSize] || "";

            return (
              <div
                key={dim.key}
                className="bg-navy rounded-lg p-6 border border-navy-mid"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-body text-lg font-semibold text-white">
                    {dim.name}
                  </h3>
                  <span className="text-gold-web font-body text-sm font-semibold">
                    {dim.score} &middot; {dim.label}
                  </span>
                </div>
                <p className="text-body-text text-sm leading-relaxed">
                  {interpretation}
                </p>
                {modifier && (
                  <p className="text-body-text text-sm leading-relaxed mt-3 italic">
                    {modifier}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommendations */}
      <section className="px-6 py-8 max-w-3xl mx-auto w-full">
        <h2 className="font-headline text-2xl font-bold text-white mb-4">
          Your Top Recommendations
        </h2>
        <p className="text-body-text text-sm mb-8">
          Based on your lowest-scoring dimensions and your practice size, here
          is where to focus first.
        </p>

        <div className="space-y-4">
          {topRecs.map((rec, index) => (
            <div
              key={index}
              className="bg-navy rounded-lg p-6 border border-navy-mid flex gap-4"
            >
              <span className="text-gold-web font-headline text-2xl font-bold shrink-0">
                {index + 1}
              </span>
              <div>
                <p className="text-gold-primary font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {rec.dimension}
                </p>
                <p className="text-white font-body text-sm leading-relaxed">
                  {rec.text}
                </p>
              </div>
            </div>
          ))}
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
              {lowest[0]?.name}
            </p>
            <p className="text-muted text-sm mt-1">
              Score: {lowest[0]?.score}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 max-w-3xl mx-auto w-full text-center">
        <h2 className="font-headline text-2xl font-bold text-white mb-4">
          Ready to Take the Next Step?
        </h2>
        <p className="text-body-text mb-8 max-w-xl mx-auto">
          Share your results with your team or book a consultation to discuss
          your AI readiness roadmap.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CopyLinkButton />
          <a
            href="https://lawlab.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold-web hover:bg-gold-light text-navy-deep font-body font-bold px-8 py-3 rounded transition-colors"
          >
            Book a Consultation
          </a>
        </div>
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
