export type FirmSize = "solo" | "small" | "mid" | "large";

export type DimensionKey =
  | "data_readiness"
  | "process_maturity"
  | "tech_infrastructure"
  | "governance_risk"
  | "people_culture";

export interface Question {
  id: number;
  dimension: DimensionKey;
  text: string;
  soloVariant?: string;
  isReversed: boolean;
}

export interface Dimension {
  key: DimensionKey;
  name: string;
  weight: number;
  questionIds: number[];
}

export type MaturityLevel =
  | "foundation_needed"
  | "early_stage"
  | "developing"
  | "operationalized"
  | "optimizing";

export interface MaturityBand {
  level: MaturityLevel;
  label: string;
  min: number;
  max: number;
}

export type Answers = Record<number, number>;
