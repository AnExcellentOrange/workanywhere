"use client";

import type { ChoiceOption, Locale } from "@/lib/types";

export default function ChoiceInput({
  locale,
  options,
  value,
  onChange,
}: {
  locale: Locale;
  options: ChoiceOption[];
  value: string | undefined;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {options.map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={`border-[3px] border-ink px-4 py-2 text-sm font-bold transition-transform sm:text-base ${
              selected
                ? "-translate-x-0.5 -translate-y-0.5 bg-mustard text-ink shadow-neo-mustard-sm"
                : "bg-cream text-ink hover:bg-cream-2"
            }`}
          >
            {option.label[locale]}
          </button>
        );
      })}
    </div>
  );
}
