interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted text-xs font-body">
          Section {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full h-1.5 bg-navy-mid rounded-full overflow-hidden">
        <div
          className="h-full bg-gold-web rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
