"use client";

import { useMemo, useRef, useState } from "react";
import QuestionCard from "./QuestionCard";
import LikertInput from "./LikertInput";
import ChoiceInput from "./ChoiceInput";
import MajorSelect from "./MajorSelect";
import SalaryInput from "./SalaryInput";
import { questions } from "@/lib/quizData";
import { t } from "@/lib/i18n";
import { allAnswered, countAnswered, unansweredQuestionIds } from "@/lib/scoring";
import type { Answers, Locale } from "@/lib/types";

export default function QuestionsScreen({
  locale,
  answers,
  onAnswerChange,
  onSubmit,
}: {
  locale: Locale;
  answers: Answers;
  onAnswerChange: (id: string, value: number | string) => void;
  onSubmit: () => void;
}) {
  const text = t(locale);
  const [invalidIds, setInvalidIds] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const invalidTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const answered = useMemo(() => countAnswered(answers), [answers]);
  const total = questions.length;

  const handleStart = () => {
    if (allAnswered(answers)) {
      onSubmit();
      return;
    }

    const missing = unansweredQuestionIds(answers);
    setInvalidIds(new Set(missing));

    const firstCard = cardRefs.current.get(missing[0]);
    firstCard?.scrollIntoView({ behavior: "smooth", block: "center" });

    if (invalidTimeout.current) clearTimeout(invalidTimeout.current);
    invalidTimeout.current = setTimeout(() => setInvalidIds(new Set()), 900);
  };

  return (
    <div className="min-h-screen pb-32">
      <header className="border-b-[3px] border-ink bg-mustard px-4 pb-6 pt-16 sm:pt-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-black leading-tight sm:text-3xl">
            {text.siteTitle}
          </h1>
          <p className="mt-1 text-sm font-bold text-ink/80 sm:text-base">
            {text.siteSubtitle}
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-2xl flex-col gap-5 px-4 py-6 sm:gap-6">
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            title={q.title[locale]}
            invalid={invalidIds.has(q.id)}
            cardRef={(el) => {
              if (el) cardRefs.current.set(q.id, el);
            }}
          >
            {q.type === "likert" && (
              <LikertInput
                locale={locale}
                value={typeof answers[q.id] === "number" ? (answers[q.id] as number) : undefined}
                onChange={(v) => onAnswerChange(q.id, v)}
              />
            )}
            {q.type === "choice" && (
              <ChoiceInput
                locale={locale}
                options={q.options}
                value={typeof answers[q.id] === "string" ? (answers[q.id] as string) : undefined}
                onChange={(id) => onAnswerChange(q.id, id)}
              />
            )}
            {q.type === "major" && (
              <MajorSelect
                locale={locale}
                options={q.options}
                value={typeof answers[q.id] === "string" ? (answers[q.id] as string) : undefined}
                onChange={(id) => onAnswerChange(q.id, id)}
              />
            )}
            {q.type === "salary" && (
              <SalaryInput
                locale={locale}
                tiers={q.tiers}
                value={typeof answers[q.id] === "string" ? (answers[q.id] as string) : undefined}
                onChange={(id) => onAnswerChange(q.id, id)}
              />
            )}
          </QuestionCard>
        ))}
      </main>

      <div className="fixed bottom-20 right-3 z-40 border-[3px] border-ink bg-cream px-3 py-1.5 text-xs font-black shadow-neo-sm sm:bottom-24 sm:right-4">
        {text.progress(answered, total)}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t-[3px] border-ink bg-cream p-3 sm:p-4">
        <button
          type="button"
          onClick={handleStart}
          className="mx-auto block w-full max-w-2xl border-[3px] border-ink bg-terracotta py-4 text-lg font-black text-cream shadow-neo transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-neo-sm"
        >
          {text.startButton}
        </button>
      </div>
    </div>
  );
}
