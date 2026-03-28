import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="w-full px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <span className="font-headline text-xl font-bold text-white">
          LawLab AI<sup className="text-xs">™</sup>
        </span>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-4xl mx-auto text-center">
        <p className="text-gold-primary font-body text-sm font-bold uppercase tracking-widest mb-6">
          Free Assessment
        </p>

        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          How Ready Is Your Legal Team for AI?
        </h1>

        <p className="mt-6 text-lg md:text-xl text-body-text max-w-2xl leading-relaxed">
          Most legal teams know AI is coming. Few know where they actually stand.
          This assessment measures your readiness across five critical dimensions
          and gives you a clear picture of where to focus first.
        </p>

        <Link
          href="/assessment"
          className="mt-10 inline-block bg-gold-web hover:bg-gold-light text-navy-deep font-body font-bold text-lg px-8 py-4 rounded transition-colors"
        >
          Start the Assessment
        </Link>

        <p className="mt-4 text-muted text-sm">
          25 questions. Under 10 minutes. Immediate results.
        </p>
      </section>

      {/* What You Get */}
      <section className="bg-navy px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-white text-center mb-12">
            What You Get
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-navy-mid rounded-lg p-6">
              <h3 className="font-body text-lg font-semibold text-white mb-3">
                Readiness Score
              </h3>
              <p className="text-body-text text-sm leading-relaxed">
                An overall maturity level plus individual scores across data
                readiness, process maturity, technology, governance, and culture.
              </p>
            </div>

            <div className="bg-navy-mid rounded-lg p-6">
              <h3 className="font-body text-lg font-semibold text-white mb-3">
                Prioritized Recommendations
              </h3>
              <p className="text-body-text text-sm leading-relaxed">
                Specific next steps based on your weakest areas and your team
                size. Not generic advice. Actionable guidance tailored to where
                you are today.
              </p>
            </div>

            <div className="bg-navy-mid rounded-lg p-6">
              <h3 className="font-body text-lg font-semibold text-white mb-3">
                Shareable Results
              </h3>
              <p className="text-body-text text-sm leading-relaxed">
                A visual results card you can share with your team or leadership
                to start the conversation about AI readiness at your
                organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-white mb-8">
            Built for Legal Professionals
          </h2>
          <p className="text-body-text text-lg leading-relaxed mb-8">
            Whether you are a solo practitioner, a small firm managing partner,
            an in-house legal operations director, or leading a large legal
            department, this assessment meets you where you are. The questions
            adapt to your team size, and the recommendations reflect the reality
            of your practice.
          </p>
          <Link
            href="/assessment"
            className="inline-block bg-gold-web hover:bg-gold-light text-navy-deep font-body font-bold px-8 py-4 rounded transition-colors"
          >
            Assess Your Readiness
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-navy-mid">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-headline text-sm font-bold text-white">
            LawLab AI<sup className="text-xs">™</sup>
          </span>
          <p className="text-muted text-xs">
            &copy; 2026 LawLab AI, LLC. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
