"use client";

import { useState } from "react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-block border border-gold-web text-gold-web hover:bg-navy-mid font-body font-bold px-8 py-3 rounded transition-colors cursor-pointer"
    >
      {copied ? "Link Copied!" : "Share with Your Team"}
    </button>
  );
}
