"use client";

import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const LIKERT_VALUES = [-2, -1, 0, 1, 2];

export default function LikertInput({
  locale,
  value,
  onChange,
}: {
  locale: Locale;
  value: number | undefined;
  onChange: (value: number) => void;
}) {
  const text = t(locale);

  return (
    <div>
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        {LIKERT_VALUES.map((v, i) => {
          const selected = value === v;
          return (
            <button
              key={v}
              type="button"
              aria-pressed={selected}
              aria-label={`${i + 1}`}
              onClick={() => onChange(v)}
              className={`flex h-11 w-11 flex-1 items-center justify-center border-[3px] border-ink text-base font-black transition-transform sm:h-14 sm:text-lg ${
                selected
                  ? "-translate-x-0.5 -translate-y-0.5 bg-terracotta text-cream shadow-neo-sm"
                  : "bg-cream text-ink hover:bg-cream-2"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-bold uppercase tracking-wide text-ink/70 sm:text-xs">
        <span>{text.likertLow}</span>
        <span>{text.likertHigh}</span>
      </div>
    </div>
  );
}
