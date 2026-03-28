interface NextButtonProps {
  enabled: boolean;
  isLast: boolean;
  onClick: () => void;
  loading?: boolean;
}

export default function NextButton({
  enabled,
  isLast,
  onClick,
  loading,
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
      {loading ? "Calculating..." : isLast ? "See Your Results" : "Next Section"}
    </button>
  );
}
