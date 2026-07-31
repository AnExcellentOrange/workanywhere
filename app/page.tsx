"use client";

import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import QuestionsScreen from "@/components/QuestionsScreen";
import LoadingScreen from "@/components/LoadingScreen";
import ResultsScreen from "@/components/ResultsScreen";
import { calculateResult } from "@/lib/scoring";
import type { Answers, DestinationId, Locale } from "@/lib/types";

type Screen = "questions" | "loading" | "results";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [screen, setScreen] = useState<Screen>("questions");
  const [answers, setAnswers] = useState<Answers>({});
  const [destination, setDestination] = useState<DestinationId | null>(null);

  const handleAnswerChange = (id: string, value: number | string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    setScreen("loading");
  };

  const handleLoadingDone = () => {
    const result = calculateResult(answers);
    setDestination(result.destination);
    setScreen("results");
  };

  const handleRetake = () => {
    setAnswers({});
    setDestination(null);
    setScreen("questions");
  };

  return (
    <div className="min-h-screen bg-cream">
      <LanguageSwitcher locale={locale} onChange={setLocale} />

      {screen === "questions" && (
        <QuestionsScreen
          locale={locale}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onSubmit={handleSubmit}
        />
      )}

      {screen === "loading" && <LoadingScreen locale={locale} onDone={handleLoadingDone} />}

      {screen === "results" && destination && (
        <ResultsScreen locale={locale} destination={destination} onRetake={handleRetake} />
      )}
    </div>
  );
}
