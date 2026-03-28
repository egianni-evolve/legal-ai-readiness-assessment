"use client";

import { useRouter } from "next/navigation";

const firmSizes = [
  {
    id: "solo",
    label: "Solo Practitioner",
    description: "Sole legal professional or solo practice",
  },
  {
    id: "small",
    label: "Small Team",
    description: "2 to 10 people",
  },
  {
    id: "mid",
    label: "Mid-Size Team",
    description: "11 to 50 people",
  },
  {
    id: "large",
    label: "Large Department",
    description: "50+ people",
  },
] as const;

export default function AssessmentGate() {
  const router = useRouter();

  function handleSelect(firmSize: string) {
    router.push(`/assessment/1?firm=${firmSize}`);
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="w-full px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <a href="/" className="font-headline text-xl font-bold text-white">
          LawLab AI<sup className="text-xs">™</sup>
        </a>
      </nav>

      {/* Gate Question */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-3xl mx-auto">
        <p className="text-gold-primary font-body text-sm font-bold uppercase tracking-widest mb-6">
          Before We Begin
        </p>

        <h1 className="font-headline text-3xl md:text-4xl font-bold text-white text-center leading-tight">
          Which best describes your practice?
        </h1>

        <p className="mt-4 text-body-text text-center max-w-xl">
          This helps us tailor the assessment questions and recommendations to
          your situation.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4 w-full max-w-2xl">
          {firmSizes.map((size) => (
            <button
              key={size.id}
              onClick={() => handleSelect(size.id)}
              className="bg-navy-mid hover:bg-navy-brand border border-navy-mid hover:border-gold-web rounded-lg p-6 text-left transition-colors group cursor-pointer"
            >
              <h3 className="font-body text-lg font-semibold text-white group-hover:text-gold-light transition-colors">
                {size.label}
              </h3>
              <p className="mt-1 text-muted text-sm">{size.description}</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
