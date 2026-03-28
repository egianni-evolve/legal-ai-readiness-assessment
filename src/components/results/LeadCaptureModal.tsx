"use client";

import { useState } from "react";

interface LeadCaptureModalProps {
  assessmentId: string;
  firmSize: string;
  maturityLevel: string;
}

export default function LeadCaptureModal({
  assessmentId,
}: LeadCaptureModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          assessmentId,
        }),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="w-full text-center py-3">
        <p className="text-white font-body font-semibold text-sm">
          Check your inbox. Your results have been sent.
        </p>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block border border-gold-web text-gold-web hover:bg-navy-mid font-body font-bold px-8 py-3 rounded transition-colors cursor-pointer"
      >
        Email My Results
      </button>
    );
  }

  return (
    <div className="w-full space-y-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourfirm.com"
          required
          className="flex-1 bg-navy-deep border border-navy-mid focus:border-gold-web text-white font-body text-sm px-4 py-3 rounded outline-none transition-colors placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-gold-web hover:bg-gold-light text-navy-deep font-body font-bold px-6 py-3 rounded transition-colors cursor-pointer disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>
        {status === "error" && (
          <p className="text-mission-red text-sm self-center">
            Failed. Try again.
        </p>
      )}
      </form>
      <p className="text-muted text-xs text-center sm:text-left">
        Your email is used only to send your results. No spam.
      </p>
    </div>
  );
}
