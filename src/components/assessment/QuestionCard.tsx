import { LIKERT_OPTIONS } from "@/lib/constants";
import type { Question, FirmSize } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  firmSize: FirmSize;
  selectedValue: number | undefined;
  onSelect: (questionId: number, value: number) => void;
}

export default function QuestionCard({
  question,
  firmSize,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  const displayText =
    firmSize === "solo" && question.soloVariant
      ? question.soloVariant
      : question.text;

  return (
    <div className="py-6 border-b border-navy-mid last:border-b-0">
      <p className="text-white font-body text-base leading-relaxed mb-4">
        <span className="text-muted mr-2">{question.id}.</span>
        {displayText}
      </p>

      <div className="flex flex-wrap gap-2">
        {LIKERT_OPTIONS.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => onSelect(question.id, option.value)}
              className={`px-4 py-2 rounded text-sm font-body transition-colors cursor-pointer ${
                isSelected
                  ? "bg-gold-web text-navy-deep font-semibold"
                  : "bg-navy-mid text-body-text hover:bg-navy-brand hover:text-white"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
