"use client";

import { useEffect, useState } from "react";
import { fallbackRates } from "./quizData";

export interface Rates {
  cny: number;
  usd: number;
}

// Client-side fetch of live GBP exchange rates, falling back to the static
// demo rates from the spec if the request fails. A real production build
// could swap this for a cached Next.js API route.
export function useExchangeRates(): Rates {
  const [rates, setRates] = useState<Rates>(fallbackRates);

  useEffect(() => {
    let cancelled = false;

    fetch("https://open.er-api.com/v6/latest/GBP")
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data) => {
        const cny = data?.rates?.CNY;
        const usd = data?.rates?.USD;
        if (!cancelled && typeof cny === "number" && typeof usd === "number") {
          setRates({ cny, usd });
        }
      })
      .catch(() => {
        // keep fallback rates
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return rates;
}
