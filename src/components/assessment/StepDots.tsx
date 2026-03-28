import { DIMENSIONS } from "@/lib/constants";

interface StepDotsProps {
  currentStep: number;
}

export default function StepDots({ currentStep }: StepDotsProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {DIMENSIONS.map((dim, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={dim.key} className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                isCompleted
                  ? "bg-gold-web"
                  : isActive
                    ? "bg-gold-primary"
                    : "bg-navy-mid"
              }`}
            />
            <span
              className={`text-xs font-body hidden sm:inline ${
                isActive ? "text-white" : "text-muted"
              }`}
            >
              {dim.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
