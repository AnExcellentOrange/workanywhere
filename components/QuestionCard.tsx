"use client";

import type { ReactNode, Ref } from "react";

export default function QuestionCard({
  title,
  invalid,
  children,
  cardRef,
}: {
  title: string;
  invalid: boolean;
  children: ReactNode;
  cardRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={cardRef}
      className={`border-[3px] border-ink bg-cream-2 p-5 shadow-neo sm:p-6 ${
        invalid ? "animate-invalid-nudge" : ""
      }`}
    >
      <h2 className="mb-4 text-lg font-black leading-snug sm:text-xl">{title}</h2>
      {children}
    </div>
  );
}
