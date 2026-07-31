"use client";

import { t } from "@/lib/i18n";
import type { ChoiceOption, Locale } from "@/lib/types";

export default function MajorSelect({
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
  const text = t(locale);

  return (
    <div className="relative">
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border-[3px] border-ink bg-cream px-4 py-3 pr-10 text-base font-bold text-ink focus:shadow-neo-sm focus:outline-none"
      >
        <option value="" disabled>
          {text.majorPlaceholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label[locale]}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg font-black">
        ▼
      </span>
    </div>
  );
}
