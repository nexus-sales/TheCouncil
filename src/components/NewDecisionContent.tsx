"use client";

import { DecisionInput } from "@/components/DecisionInput";
import { useLocale } from "@/lib/i18n";

export function NewDecisionContent() {
  const { t } = useLocale();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t.newPage.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.newPage.description}</p>
      </div>
      <DecisionInput />
    </main>
  );
}
