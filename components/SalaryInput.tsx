"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";
import { useExchangeRates } from "@/lib/useExchangeRates";
import type { Currency, Locale, SalaryTier } from "@/lib/types";

const CURRENCIES: Currency[] = ["GBP", "CNY", "USD"];

function formatTierLabel(
  tier: SalaryTier,
  currency: Currency,
  rate: number,
  locale: Locale,
  doesntMatterLabel: string
): { main: string; sub?: string } {
  if (tier.id === "doesntmatter") return { main: doesntMatterLabel };

  const symbol = currency === "GBP" ? "£" : currency === "CNY" ? "¥" : "$";
  const numberLocale = locale === "zh" ? "zh-CN" : "en-US";

  const formatNumber = (n: number) => {
    if (currency === "GBP") return `${Math.round(n / 1000)}k`;
    return Math.round(n).toLocaleString(numberLocale);
  };

  const min = tier.gbpMin !== null ? tier.gbpMin * rate : null;
  const max = tier.gbpMax !== null ? tier.gbpMax * rate : null;

  let main: string;
  if (min !== null && max === null) {
    main = `>${symbol}${formatNumber(min)}`;
  } else if (min !== null && max !== null) {
    main = `${symbol}${formatNumber(min)}-${symbol}${formatNumber(max)}`;
  } else {
    main = doesntMatterLabel;
  }

  let sub: string | undefined;
  if (currency === "CNY" && min !== null) {
    const minWan = (min / 10000).toFixed(1);
    sub = max !== null ? `~${minWan}万-${(max / 10000).toFixed(1)}万` : `~${minWan}万+`;
  }

  return { main, sub };
}

export default function SalaryInput({
  locale,
  tiers,
  value,
  onChange,
}: {
  locale: Locale;
  tiers: SalaryTier[];
  value: string | undefined;
  onChange: (id: string) => void;
}) {
  const text = t(locale);
  const rates = useExchangeRates();
  const [currency, setCurrency] = useState<Currency>("GBP");
  const rate = currency === "GBP" ? 1 : currency === "CNY" ? rates.cny : rates.usd;

  return (
    <div>
      <div className="mb-4 flex border-[3px] border-ink self-start w-fit">
        {CURRENCIES.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={currency === c}
            onClick={() => setCurrency(c)}
            className={`px-4 py-1.5 text-sm font-black transition-colors ${
              c !== "GBP" ? "border-l-[3px] border-ink" : ""
            } ${currency === c ? "bg-ink text-cream" : "bg-cream text-ink hover:bg-cream-2"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {tiers.map((tier) => {
          const selected = value === tier.id;
          const { main, sub } = formatTierLabel(tier, currency, rate, locale, text.doesntMatter);
          return (
            <button
              key={tier.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(tier.id)}
              className={`flex items-center justify-between border-[3px] border-ink px-4 py-3 text-left font-bold transition-transform ${
                selected
                  ? "-translate-x-0.5 -translate-y-0.5 bg-forest text-cream shadow-neo-forest-sm"
                  : "bg-cream text-ink hover:bg-cream-2"
              }`}
            >
              <span className="text-base sm:text-lg">{main}</span>
              {sub && (
                <span className={`text-xs ${selected ? "text-cream/80" : "text-ink/60"}`}>
                  {sub}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
