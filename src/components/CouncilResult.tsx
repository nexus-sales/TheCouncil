"use client";

import { useState } from "react";
import Link from "next/link";
import { AdvisorCard } from "@/components/AdvisorCard";
import { ADVISORS } from "@/core/council";
import type { CouncilResult as TCouncilResult } from "@/core/types";
import { useLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

interface CouncilResultProps {
  id: string;
}

function ChairmanItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </p>
      <p className="text-sm leading-relaxed">{value}</p>
    </div>
  );
}

export function CouncilResult({ id }: CouncilResultProps) {
  const { t } = useLocale();
  const [result] = useState<TCouncilResult | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem(`council-${id}`);
    return stored ? (JSON.parse(stored) as TCouncilResult) : null;
  });

  if (!result) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-muted-foreground">{t.result.notFound}</p>
        <Link
          href="/new"
          className="inline-flex h-8 items-center justify-center rounded-lg border border-white/10 px-4 text-sm font-medium transition-colors hover:bg-white/5"
        >
          {t.result.startNew}
        </Link>
      </div>
    );
  }

  const mode = t.modes[result.mode] ?? t.modes.decision;

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-muted-foreground">
            {mode.label}
          </span>
          <span className="rounded-md border border-white/10 px-2.5 py-1 text-xs capitalize text-muted-foreground">
            {t.result.escalation[result.escalation]}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(result.createdAt)}
          </span>
        </div>
        <p className="text-lg font-semibold">{result.input.question}</p>
        {result.input.context && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {result.input.context}
          </p>
        )}
        {result.input.options && result.input.options.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {result.input.options.map((option, index) => (
              <span
                key={index}
                className="rounded-md border border-white/10 px-3 py-1 text-xs text-muted-foreground"
              >
                {option}
              </span>
            ))}
          </div>
        )}
      </section>

      {result.status === "needs_data" && (
        <section className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-5">
          <p className="mb-1 text-xs font-semibold uppercase text-amber-300">
            {t.result.councilPaused}
          </p>
          <h2 className="text-xl font-semibold text-amber-100">
            {result.missingDataQuestion}
          </h2>
          {result.whyCouncilPaused && (
            <p className="mt-3 text-sm leading-relaxed text-amber-50/80">
              {result.whyCouncilPaused}
            </p>
          )}
        </section>
      )}

      {result.assumptions.length > 0 && (
        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
            {t.result.assumptions}
          </p>
          <ul className="space-y-1.5">
            {result.assumptions.map((assumption, index) => (
              <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                <span>{assumption}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {result.status === "analysis" && (
        <>
          <section className="space-y-4">
            {result.advisors.map((opinion) => {
              const advisor = ADVISORS.find((item) => item.id === opinion.advisorId);
              if (!advisor) return null;
              return (
                <AdvisorCard
                  key={opinion.advisorId}
                  advisor={advisor}
                  opinion={opinion}
                />
              );
            })}
          </section>

          {result.chairman && (
            <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  {t.result.chairman}
                </p>
                <h2 className="mt-1 text-2xl font-semibold">{t.result.synthesis}</h2>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <ChairmanItem label={t.result.convergence} value={result.chairman.convergence} />
                <ChairmanItem label={t.result.groupthink} value={result.chairman.groupthinkCheck} />
                <ChairmanItem label={t.result.tension} value={result.chairman.tension} />
                <ChairmanItem label={t.result.invalidated} value={result.chairman.invalidated} />
                <ChairmanItem label={t.result.selfAttack} value={result.chairman.selfAttack} />
                <ChairmanItem label={t.result.minorityCost} value={result.chairman.minorityCost} />
              </div>
              <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-5">
                <p className="mb-1 text-xs font-semibold uppercase text-emerald-300">
                  {t.result.decision}
                </p>
                <p className="text-base font-semibold leading-relaxed text-emerald-50">
                  {result.chairman.decision}
                </p>
              </div>
            </section>
          )}
        </>
      )}

      <div className="flex gap-3 pt-4">
        <Link
          href="/new"
          className="inline-flex h-8 items-center justify-center rounded-lg border border-white/10 px-4 text-sm font-medium transition-colors hover:bg-white/5"
        >
          {t.result.newDecision}
        </Link>
      </div>
    </div>
  );
}
