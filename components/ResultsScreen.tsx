"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { resultCopy, TROPHY_IMAGE_SRC } from "@/lib/quizData";
import { t } from "@/lib/i18n";
import type { DestinationId, Locale } from "@/lib/types";

export default function ResultsScreen({
  locale,
  destination,
  onRetake,
}: {
  locale: Locale;
  destination: DestinationId;
  onRetake: () => void;
}) {
  const text = t(locale);
  const result = resultCopy[destination];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const colors = ["#C65D3B", "#3B6B52", "#E0A233", "#1A1A1A", "#F5EFE0"];
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.5 },
      colors,
      startVelocity: 45,
      ticks: 220,
    });
  }, []);

  const handleShare = async () => {
    const shareText = text.shareText(result.title[locale]);
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; ignore silently
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 py-16">
      <div className="w-full max-w-md border-[3px] border-ink bg-cream-2 p-6 text-center shadow-neo-lg sm:p-8">
        <div
          className="relative mx-auto mb-4 h-32 w-32 sm:h-40 sm:w-40"
          style={{ perspective: "900px" }}
        >
          <Image
            key={destination}
            src={TROPHY_IMAGE_SRC}
            alt="Trophy"
            fill
            sizes="160px"
            className="animate-trophy-spin object-contain"
            priority
          />
        </div>

        <p className="mb-2 text-sm font-black uppercase tracking-wide text-terracotta sm:text-base">
          {text.congrats}
        </p>
        <h1 className="mb-4 text-2xl font-black leading-tight sm:text-3xl">
          {result.title[locale]}
        </h1>
        <p className="mb-6 text-left text-base leading-relaxed text-ink/90 sm:text-lg">
          {result.body[locale]}
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="border-[3px] border-ink bg-mustard py-3 font-black text-ink shadow-neo-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            {copied ? text.shareCopied : text.shareButton}
          </button>
          <button
            type="button"
            onClick={onRetake}
            className="border-[3px] border-ink bg-cream py-3 font-black text-ink shadow-neo-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            {text.retakeButton}
          </button>
        </div>
      </div>
    </div>
  );
}
