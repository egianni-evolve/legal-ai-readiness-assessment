"use client";

import { useState } from "react";
import type { DimensionKey, FirmSize, MaturityLevel } from "@/lib/types";
import { DIMENSIONS, MATURITY_BANDS } from "@/lib/constants";
import {
  OVERALL_INTERPRETATIONS,
  DIMENSION_INTERPRETATIONS,
  FIRM_SIZE_MODIFIERS,
  RECOMMENDATIONS,
} from "@/lib/interpretations";

interface DownloadPdfButtonProps {
  overallScore: number;
  maturityLevel: MaturityLevel;
  firmSize: FirmSize;
  dimensionScores: Record<DimensionKey, number>;
  sortedDimensions: Array<{
    key: DimensionKey;
    name: string;
    score: number;
    level: MaturityLevel;
    label: string;
  }>;
  lowest: Array<{ key: DimensionKey; name: string; score: number; label: string }>;
  strongest: { key: DimensionKey; name: string; score: number; label: string };
}

function getMaturityLabel(level: MaturityLevel): string {
  const band = MATURITY_BANDS.find((b) => b.level === level);
  return band?.label ?? "Unknown";
}

export default function DownloadPdfButton({
  overallScore,
  maturityLevel,
  firmSize,
  sortedDimensions,
  lowest,
  strongest,
}: DownloadPdfButtonProps) {
  const [generating, setGenerating] = useState(false);

  async function handleDownload() {
    setGenerating(true);

    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // Brand colors
      const navy = [17, 29, 51] as [number, number, number];
      const gold = [201, 149, 62] as [number, number, number];
      const white = [255, 255, 255] as [number, number, number];
      const bodyGray = [85, 85, 85] as [number, number, number];
      const mutedGray = [138, 149, 168] as [number, number, number];

      // Header background
      doc.setFillColor(...navy);
      doc.rect(0, 0, pageWidth, 55, "F");

      // Logo
      doc.setFont("times", "bold");
      doc.setFontSize(22);
      doc.setTextColor(...white);
      doc.text("LawLab AI", margin, 20);

      // TM
      const logoWidth = doc.getTextWidth("LawLab AI");
      doc.setFontSize(7);
      doc.text("\u2122", margin + logoWidth + 0.5, 16);

      // Title
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(...gold);
      doc.text("LEGAL AI READINESS ASSESSMENT REPORT", margin, 32);

      // Date
      doc.setFontSize(9);
      doc.setTextColor(...mutedGray);
      doc.text(
        `Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
        margin,
        42
      );

      y = 70;

      // Overall score section
      const maturityLabel = getMaturityLabel(maturityLevel);
      doc.setFont("times", "bold");
      doc.setFontSize(28);
      doc.setTextColor(...navy);
      doc.text(maturityLabel, pageWidth / 2, y, { align: "center" });
      y += 12;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(...gold);
      doc.text(`${overallScore} / 5.0`, pageWidth / 2, y, { align: "center" });
      y += 12;

      // Overall interpretation
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...bodyGray);
      const overallText = OVERALL_INTERPRETATIONS[maturityLevel];
      const overallLines = doc.splitTextToSize(overallText, contentWidth);
      doc.text(overallLines, margin, y);
      y += overallLines.length * 5 + 10;

      // Dimension scores table
      doc.setFont("times", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...navy);
      doc.text("Dimension Breakdown", margin, y);
      y += 8;

      autoTable(doc, {
        startY: y,
        head: [["Dimension", "Score", "Level"]],
        body: sortedDimensions.map((dim) => [
          dim.name,
          dim.score.toString(),
          dim.label,
        ]),
        theme: "plain",
        headStyles: {
          fillColor: navy,
          textColor: white,
          font: "helvetica",
          fontStyle: "bold",
          fontSize: 10,
        },
        bodyStyles: {
          textColor: bodyGray,
          font: "helvetica",
          fontSize: 10,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 250],
        },
        margin: { left: margin, right: margin },
      });

      y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;

      // Strongest & Focus
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...gold);
      doc.text("STRONGEST AREA", margin, y);
      doc.text("FOCUS AREA", pageWidth / 2 + 5, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(...navy);
      doc.text(strongest?.name ?? "N/A", margin, y);
      doc.text(lowest?.[0]?.name ?? "N/A", pageWidth / 2 + 5, y);
      y += 14;

      // Per-dimension interpretations
      doc.setFont("times", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...navy);
      doc.text("Detailed Analysis", margin, y);
      y += 8;

      for (const dim of sortedDimensions) {
        // Check if we need a new page
        if (y > 250) {
          doc.addPage();
          y = margin;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...navy);
        doc.text(`${dim.name}  (${dim.score} — ${dim.label})`, margin, y);
        y += 6;

        const interpretation =
          DIMENSION_INTERPRETATIONS[dim.key]?.[dim.level as MaturityLevel] || "";
        const modifier = FIRM_SIZE_MODIFIERS[dim.key]?.[firmSize] || "";
        const fullText = interpretation + (modifier ? " " + modifier : "");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...bodyGray);
        const lines = doc.splitTextToSize(fullText, contentWidth);
        doc.text(lines, margin, y);
        y += lines.length * 4.5 + 8;
      }

      // Recommendations
      if (y > 230) {
        doc.addPage();
        y = margin;
      }

      doc.setFont("times", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...navy);
      doc.text("Top Recommendations", margin, y);
      y += 8;

      const recs: Array<{ dimension: string; text: string }> = [];
      for (const dim of lowest.slice(0, 2)) {
        const dimRecs = RECOMMENDATIONS[dim.key]?.[firmSize] || [];
        for (const rec of dimRecs.slice(0, 2)) {
          recs.push({ dimension: dim.name, text: rec });
        }
      }

      recs.slice(0, 3).forEach((rec, index) => {
        if (y > 260) {
          doc.addPage();
          y = margin;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...gold);
        doc.text(`${index + 1}. ${rec.dimension}`, margin, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...bodyGray);
        const recLines = doc.splitTextToSize(rec.text, contentWidth);
        doc.text(recLines, margin, y);
        y += recLines.length * 4.5 + 6;
      });

      // Footer CTA
      if (y > 245) {
        doc.addPage();
        y = margin;
      }

      y += 5;
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      doc.setFont("times", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...navy);
      doc.text("Ready to take the next step?", margin, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...bodyGray);
      doc.text(
        "Book a consultation to discuss your AI readiness roadmap.",
        margin,
        y
      );
      y += 6;

      doc.setTextColor(...gold);
      doc.textWithLink("lawlab.ai", margin, y, { url: "https://lawlab.ai/" });

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...mutedGray);
        doc.text(
          "\u00A9 2026 LawLab AI, LLC. All rights reserved.",
          pageWidth / 2,
          290,
          { align: "center" }
        );
      }

      doc.save("LawLab-AI-Readiness-Report.pdf");
    } catch {
      // Silent fail
    } finally {
      setGenerating(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className="inline-block border border-gold-web text-gold-web hover:bg-navy-mid font-body font-bold px-8 py-3 rounded transition-colors cursor-pointer disabled:opacity-50"
    >
      {generating ? "Generating..." : "Download PDF Report"}
    </button>
  );
}
