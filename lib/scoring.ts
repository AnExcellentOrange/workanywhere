import {
  destinationOrder,
  destinationWeights,
  dimensionQuestionCounts,
  highTierSalaryMajors,
  lowTierSalaryMajors,
  questions,
} from "./quizData";
import type { Answers, DestinationId, Dimension } from "./types";

const TIE_THRESHOLD = 0.3;

function salaryExpectationScore(tierId: string | undefined, majorId: string | undefined): number {
  if (!tierId || tierId === "doesntmatter") return 0;
  if (!majorId) return -2;
  if (tierId === "top" || tierId === "uppermid") {
    return highTierSalaryMajors.has(majorId) ? 2 : -2;
  }
  if (tierId === "lowermid") {
    return lowTierSalaryMajors.has(majorId) ? 2 : -2;
  }
  return 0;
}

export function computeDimensionScores(answers: Answers): Record<Dimension, number> {
  const raw: Record<Dimension, number> = {
    salary: 0,
    wlb: 0,
    difficulty: 0,
    convenience: 0,
    humanities: 0,
  };

  for (const q of questions) {
    if (q.type === "likert") {
      const value = answers[q.id];
      if (typeof value !== "number") continue;
      raw[q.dimension] += q.reverse ? -value : value;
    } else if (q.type === "choice" || q.type === "major") {
      const optionId = answers[q.id];
      if (typeof optionId !== "string") continue;
      const option = q.options.find((o) => o.id === optionId);
      if (option) raw[q.dimension] += option.score;
    } else if (q.type === "salary") {
      const tierId = answers[q.id];
      const majorId = answers.major;
      if (typeof tierId !== "string") continue;
      raw[q.dimension] += salaryExpectationScore(tierId, typeof majorId === "string" ? majorId : undefined);
    }
  }

  const normalized: Record<Dimension, number> = {
    salary: raw.salary / dimensionQuestionCounts.salary,
    wlb: raw.wlb / dimensionQuestionCounts.wlb,
    difficulty: raw.difficulty / dimensionQuestionCounts.difficulty,
    convenience: raw.convenience / dimensionQuestionCounts.convenience,
    humanities: raw.humanities / dimensionQuestionCounts.humanities,
  };

  return normalized;
}

export interface QuizResult {
  destination: DestinationId;
  scores: Partial<Record<DestinationId, number>>;
  dimensionScores: Record<Dimension, number>;
}

export function calculateResult(answers: Answers): QuizResult {
  const dimensionScores = computeDimensionScores(answers);

  const passportOptionId = answers.passport;
  const passportQuestion = questions.find((q) => q.id === "passport");
  const isUSPassport =
    passportQuestion?.type === "choice" &&
    passportQuestion.options.find((o) => o.id === passportOptionId)?.isUSPassport === true;

  const scores: Partial<Record<DestinationId, number>> = {};
  const eligible: { id: DestinationId; score: number }[] = [];

  for (const id of destinationOrder) {
    const weights = destinationWeights[id];
    const score =
      dimensionScores.salary * weights.salary +
      dimensionScores.wlb * weights.wlb +
      dimensionScores.difficulty * weights.difficulty +
      dimensionScores.convenience * weights.convenience +
      dimensionScores.humanities * weights.humanities;
    scores[id] = score;
    if (id === "US" && !isUSPassport) continue;
    eligible.push({ id, score });
  }

  eligible.sort((a, b) => b.score - a.score);

  let destination: DestinationId = eligible[0]?.id ?? "Nomad";
  if (eligible.length > 1 && Math.abs(eligible[0].score - eligible[1].score) <= TIE_THRESHOLD) {
    destination = "Nomad";
  }

  return { destination, scores, dimensionScores };
}

export function isQuestionAnswered(questionId: string, answers: Answers): boolean {
  const value = answers[questionId];
  if (typeof value === "number") return true;
  if (typeof value === "string") return value.length > 0;
  return false;
}

export function countAnswered(answers: Answers): number {
  return questions.filter((q) => isQuestionAnswered(q.id, answers)).length;
}

export function allAnswered(answers: Answers): boolean {
  return questions.every((q) => isQuestionAnswered(q.id, answers));
}

export function unansweredQuestionIds(answers: Answers): string[] {
  return questions.filter((q) => !isQuestionAnswered(q.id, answers)).map((q) => q.id);
}
