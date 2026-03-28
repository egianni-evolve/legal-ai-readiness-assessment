import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legal AI Readiness Assessment | LawLab AI",
  description:
    "How ready is your legal team for AI? Assess your readiness across data, process, technology, governance, and culture in under 10 minutes.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Legal AI Readiness Assessment | LawLab AI",
    description:
      "How ready is your legal team for AI? Assess your readiness across five critical dimensions in under 10 minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body bg-navy-deep text-body-text antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
