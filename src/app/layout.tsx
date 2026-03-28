import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legal AI Readiness Assessment | LawLab AI",
  description:
    "How ready is your legal team for AI? Assess your readiness across data, process, technology, governance, and culture in under 10 minutes.",
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
      </body>
    </html>
  );
}
