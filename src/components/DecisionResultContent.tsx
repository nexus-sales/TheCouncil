"use client";

import { CouncilResult } from "@/components/CouncilResult";
import { useLocale } from "@/lib/i18n";

interface DecisionResultContentProps {
  id: string;
}

export function DecisionResultContent({ id }: DecisionResultContentProps) {
  const { t } = useLocale();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t.resultPage.title}</h1>
        <p className="mt-2 text-sm font-mono text-muted-foreground">#{id}</p>
      </div>
      <CouncilResult id={id} />
    </main>
  );
}
