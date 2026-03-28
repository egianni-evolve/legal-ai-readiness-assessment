export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-pulse text-center">
        <p className="text-gold-primary font-body text-sm font-bold uppercase tracking-widest mb-4">
          Preparing Your Results
        </p>
        <div className="w-48 h-2 bg-navy-mid rounded-full mx-auto">
          <div className="w-24 h-2 bg-gold-web rounded-full animate-pulse" />
        </div>
      </div>
    </main>
  );
}
