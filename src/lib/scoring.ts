import { DIMENSIONS, QUESTIONS, MATURITY_BANDS } from "./constants";
import type { Answers, DimensionKey, MaturityLevel } from "./types";

/**
 * Normalize a single answer, accounting for reverse-scored items.
 * Normal items: value as-is (1-5)
 * Reversed items: 6 - value (so 1->5, 2->4, 3->3, 4->2, 5->1)
 */
function normalizeAnswer(questionId: number, rawValue: number): number {
  const question = QUESTIONS.find((q) => q.id === questionId);
  if (!question) return rawValue;
  return question.isReversed ? 6 - rawValue : rawValue;
}

/**
 * Calculate the average score for a single dimension (1.0 - 5.0 scale).
 */
export function calculateDimensionScore(
  answers: Answers,
  dimensionKey: DimensionKey
): number {
  const dimension = DIMENSIONS.find((d) => d.key === dimensionKey);
  if (!dimension) return 0;

  const normalized = dimension.questionIds.map((id) =>
    normalizeAnswer(id, answers[id] ?? 3)
  );

  const sum = normalized.reduce((acc, val) => acc + val, 0);
  return Number((sum / normalized.length).toFixed(2));
}

/**
 * Calculate the weighted overall score (1.0 - 5.0 scale).
 * Weights: Data 25%, Governance 25%, Process 20%, Tech 15%, People 15%
 */
export function calculateOverallScore(
  dimensionScores: Record<DimensionKey, number>
): number {
  let weightedSum = 0;

  for (const dim of DIMENSIONS) {
    weightedSum += dimensionScores[dim.key] * dim.weight;
  }

  return Number(weightedSum.toFixed(2));
}

/**
 * Map a score (1.0 - 5.0) to a maturity level.
 */
export function getMaturityLevel(score: number): MaturityLevel {
  for (const band of MATURITY_BANDS) {
    if (score >= band.min && score <= band.max) {
      return band.level;
    }
  }
  // Edge case: round up to optimizing or down to foundation
  return score > 4.2 ? "optimizing" : "foundation_needed";
}

/**
 * Get the display label for a maturity level.
 */
export function getMaturityLabel(level: MaturityLevel): string {
  const band = MATURITY_BANDS.find((b) => b.level === level);
  return band?.label ?? "Unknown";
}

/**
 * Detect straight-line responding by checking reverse-scored items.
 * If a respondent answers all questions the same (e.g., all 5s),
 * the reverse-scored items will be inconsistent.
 */
export function detectStraightLining(answers: Answers): boolean {
  const values = Object.values(answers);
  if (values.length < 25) return false;

  // Check if all non-reverse items have the same value
  const nonReversed = QUESTIONS.filter((q) => !q.isReversed);
  const reversed = QUESTIONS.filter((q) => q.isReversed);

  const nonReversedValues = nonReversed.map((q) => answers[q.id]);
  const reversedValues = reversed.map((q) => answers[q.id]);

  const allNonReversedSame = nonReversedValues.every(
    (v) => v === nonReversedValues[0]
  );
  const allReversedSame = reversedValues.every(
    (v) => v === reversedValues[0]
  );

  // If all answers are identical (including reversed items matching non-reversed),
  // that's a strong signal of straight-lining
  return (
    allNonReversedSame &&
    allReversedSame &&
    nonReversedValues[0] === reversedValues[0]
  );
}

/**
 * Run the full scoring pipeline. Returns all computed results.
 */
export function scoreAssessment(answers: Answers) {
  const dimensionScores = {} as Record<DimensionKey, number>;

  for (const dim of DIMENSIONS) {
    dimensionScores[dim.key] = calculateDimensionScore(answers, dim.key);
  }

  const overallScore = calculateOverallScore(dimensionScores);
  const maturityLevel = getMaturityLevel(overallScore);
  const maturityLabel = getMaturityLabel(maturityLevel);
  const straightLining = detectStraightLining(answers);

  // Sort dimensions by score to find lowest (for recommendations)
  const sortedDimensions = DIMENSIONS.map((dim) => ({
    key: dim.key,
    name: dim.name,
    score: dimensionScores[dim.key],
    level: getMaturityLevel(dimensionScores[dim.key]),
    label: getMaturityLabel(getMaturityLevel(dimensionScores[dim.key])),
  })).sort((a, b) => a.score - b.score);

  return {
    dimensionScores,
    overallScore,
    maturityLevel,
    maturityLabel,
    straightLining,
    sortedDimensions,
    lowestDimensions: sortedDimensions.slice(0, 2),
    strongestDimension: sortedDimensions[sortedDimensions.length - 1],
  };
}
