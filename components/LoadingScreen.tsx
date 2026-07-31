"use client";

import { useEffect, useMemo, useState } from "react";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

function generateStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 2.4,
    duration: 1.8 + Math.random() * 2,
  }));
}

const SYMBOLS = ["✦", "✧", "⋆", "✦"];
const SYMBOL_POSITIONS = [
  { top: "20%", left: "15%", delay: "0s" },
  { top: "30%", left: "82%", delay: "1.5s" },
  { top: "76%", left: "22%", delay: "3s" },
  { top: "82%", left: "78%", delay: "0.7s" },
];

export default function LoadingScreen({
  locale,
  onDone,
}: {
  locale: Locale;
  onDone: () => void;
}) {
  const text = t(locale);
  const stars = useMemo(() => generateStars(50), []);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % text.loadingPhrases.length);
    }, 1200);

    const totalDuration = 2500 + Math.random() * 1000;
    const doneTimer = setTimeout(onDone, totalDuration);

    return () => {
      clearInterval(phraseTimer);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_#2a1f45_0%,_#140f28_55%,_#0a0716_100%)]">
      {stars.map((s) => (
        <span
          key={s.id}
          className="animate-twinkle absolute rounded-full bg-cream"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {SYMBOL_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className="animate-drift absolute select-none text-3xl text-mustard opacity-60 sm:text-4xl"
          style={{ top: pos.top, left: pos.left, animationDelay: pos.delay }}
        >
          {SYMBOLS[i]}
        </div>
      ))}

      <div className="relative z-10 px-6 text-center">
        <p key={phraseIndex} className="animate-phrase-fade text-xl font-black text-cream sm:text-2xl">
          {text.loadingPhrases[phraseIndex]}
        </p>
      </div>
    </div>
  );
}
