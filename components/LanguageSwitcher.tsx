"use client";

import type { Locale } from "@/lib/types";

export default function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div
      className="fixed top-3 right-3 z-50 flex border-[3px] border-ink bg-cream shadow-neo-sm sm:top-4 sm:right-4"
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => onChange("zh")}
        className={`px-3 py-1.5 text-sm font-bold transition-colors sm:px-4 sm:py-2 ${
          locale === "zh" ? "bg-ink text-cream" : "bg-cream text-ink"
        }`}
      >
        中文
      </button>
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`border-l-[3px] border-ink px-3 py-1.5 text-sm font-bold transition-colors sm:px-4 sm:py-2 ${
          locale === "en" ? "bg-ink text-cream" : "bg-cream text-ink"
        }`}
      >
        English
      </button>
    </div>
  );
}
