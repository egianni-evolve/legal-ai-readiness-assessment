import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="font-headline text-4xl font-bold text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-body-text mb-8 text-center max-w-md">
        The page you are looking for does not exist or the assessment results
        may have expired.
      </p>
      <Link
        href="/"
        className="bg-gold-web hover:bg-gold-light text-navy-deep font-body font-bold px-8 py-3 rounded transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}
