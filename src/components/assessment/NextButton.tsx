interface NextButtonProps {
  enabled: boolean;
  isLast: boolean;
  onClick: () => void;
}

export default function NextButton({
  enabled,
  isLast,
  onClick,
}: NextButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!enabled}
      className={`mt-8 font-body font-bold text-base px-8 py-3 rounded transition-colors cursor-pointer ${
        enabled
          ? "bg-gold-web hover:bg-gold-light text-navy-deep"
          : "bg-navy-mid text-muted cursor-not-allowed"
      }`}
    >
      {isLast ? "See Your Results" : "Next Section"}
    </button>
  );
}
