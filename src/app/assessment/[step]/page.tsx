"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { DIMENSIONS, QUESTIONS } from "@/lib/constants";
import type { Answers as AnswersType } from "@/lib/types";
import type { FirmSize, Answers } from "@/lib/types";
import StepDots from "@/components/assessment/StepDots";
import ProgressBar from "@/components/assessment/ProgressBar";
import SectionHeader from "@/components/assessment/SectionHeader";
import QuestionCard from "@/components/assessment/QuestionCard";
import NextButton from "@/components/assessment/NextButton";

const STORAGE_KEY = "assessment_answers";

function getStoredAnswers(): Answers {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function storeAnswers(answers: Answers) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export default function AssessmentStep() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const step = Number(params.step);
  const firmSize = (searchParams.get("firm") || "small") as FirmSize;
  const [answers, setAnswers] = useState<Answers>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setAnswers(getStoredAnswers());
    setMounted(true);
  }, []);

  const handleSelect = useCallback(
    (questionId: number, value: number) => {
      const updated = { ...answers, [questionId]: value };
      setAnswers(updated);
      storeAnswers(updated);
    },
    [answers]
  );

  // Validate step
  if (step < 1 || step > 5 || isNaN(step)) {
    router.replace("/assessment");
    return null;
  }

  const dimension = DIMENSIONS[step - 1];
  const sectionQuestions = QUESTIONS.filter(
    (q) => q.dimension === dimension.key
  );

  const [submitting, setSubmitting] = useState(false);

  const allAnswered = sectionQuestions.every((q) => answers[q.id] !== undefined);
  const isLast = step === 5;

  async function handleNext() {
    if (!allAnswered) return;

    if (isLast) {
      setSubmitting(true);
      try {
        const allAnswers = getStoredAnswers();
        const res = await fetch("/api/submit-assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: allAnswers,
            firmSize,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          console.error("Submit failed:", errData);
          alert(`Error: ${errData.details || errData.error || "Unknown error"}`);
          setSubmitting(false);
          return;
        }

        const data = await res.json();
        sessionStorage.removeItem(STORAGE_KEY);
        router.push(`/results/${data.id}?firm=${firmSize}`);
      } catch {
        setSubmitting(false);
      }
    } else {
      router.push(`/assessment/${step + 1}?firm=${firmSize}`);
    }
  }

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="w-full px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <a href="/" className="font-headline text-xl font-bold text-white">
          LawLab AI<sup className="text-xs">™</sup>
        </a>
      </nav>

      {/* Progress */}
      <div className="px-6 py-4 max-w-3xl mx-auto w-full space-y-4">
        <StepDots currentStep={step} />
        <ProgressBar currentStep={step} totalSteps={5} />
      </div>

      {/* Questions */}
      <section className="flex-1 px-6 py-8 max-w-3xl mx-auto w-full">
        <SectionHeader dimensionName={dimension.name} />

        <div className="mt-6">
          {sectionQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              firmSize={firmSize}
              selectedValue={answers[question.id]}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          {step > 1 && (
            <button
              onClick={() =>
                router.push(`/assessment/${step - 1}?firm=${firmSize}`)
              }
              className="mt-8 font-body text-sm text-muted hover:text-white transition-colors cursor-pointer"
            >
              &larr; Previous Section
            </button>
          )}
          <div className={step === 1 ? "ml-auto" : ""}>
            <NextButton
              enabled={allAnswered && !submitting}
              isLast={isLast}
              onClick={handleNext}
              loading={submitting}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
