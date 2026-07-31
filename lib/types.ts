export type Locale = "zh" | "en";

export type Dimension =
  | "salary"
  | "wlb"
  | "difficulty"
  | "convenience"
  | "humanities";

export type DestinationId =
  | "US"
  | "China"
  | "UK"
  | "SouthernEurope"
  | "SingaporeHK"
  | "MiddleEast"
  | "Nomad";

export interface Bilingual {
  zh: string;
  en: string;
}

export interface ChoiceOption {
  id: string;
  label: Bilingual;
  score: number;
  isUSPassport?: boolean;
}

export interface LikertQuestionDef {
  id: string;
  type: "likert";
  dimension: Dimension;
  title: Bilingual;
  reverse?: boolean;
}

export interface ChoiceQuestionDef {
  id: string;
  type: "choice";
  dimension: Dimension;
  title: Bilingual;
  options: ChoiceOption[];
}

export interface MajorQuestionDef {
  id: string;
  type: "major";
  dimension: Dimension;
  title: Bilingual;
  options: ChoiceOption[];
}

export interface SalaryTier {
  id: string;
  gbpMin: number | null;
  gbpMax: number | null;
}

export interface SalaryQuestionDef {
  id: string;
  type: "salary";
  dimension: Dimension;
  title: Bilingual;
  tiers: SalaryTier[];
}

export type QuestionDef =
  | LikertQuestionDef
  | ChoiceQuestionDef
  | MajorQuestionDef
  | SalaryQuestionDef;

export type AnswerValue = number | string;
export type Answers = Record<string, AnswerValue>;

export type Currency = "GBP" | "CNY" | "USD";
