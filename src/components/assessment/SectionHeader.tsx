interface SectionHeaderProps {
  dimensionName: string;
}

export default function SectionHeader({ dimensionName }: SectionHeaderProps) {
  return (
    <h2 className="font-headline text-2xl md:text-3xl font-bold text-white">
      {dimensionName}
    </h2>
  );
}
