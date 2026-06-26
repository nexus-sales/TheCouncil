"use client";

import Link from "next/link";
import { ADVISORS } from "@/core/council";
import { ProtocolBadge } from "@/components/protocols/ProtocolBadge";
import { useLocale } from "@/lib/i18n";

export function HomeContent() {
  const { t } = useLocale();

  return (
    <main className="px-4 py-12 md:py-16">
      <section className="grid min-h-[calc(100vh-9rem)] items-center gap-10 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="mb-5 inline-flex rounded-md border border-sky-400/25 bg-sky-500/10 px-3 py-1 text-sm text-sky-200">
            {t.home.badge}
          </div>
          <div className="mb-4">
            <ProtocolBadge protocolId="council" compact />
          </div>
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {t.home.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.home.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/new"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-sky-600 px-6 text-sm font-medium text-white transition-colors hover:bg-sky-700"
            >
              {t.home.cta}
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="mb-4 text-xs font-semibold uppercase text-muted-foreground">
            {t.home.rulesTitle}
          </p>
          <div className="space-y-3">
            {t.home.principles.map((principle) => (
              <div key={principle} className="rounded-lg border border-white/10 p-3">
                <p className="text-sm font-medium">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 pb-12 md:grid-cols-5">
        {ADVISORS.map((advisor) => {
          const translated = t.advisors[advisor.id];

          return (
            <div
              key={advisor.id}
              className="rounded-xl border bg-white/[0.03] p-4"
              style={{ borderColor: `${advisor.accentColor}30` }}
            >
              <div
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-md text-xs font-bold text-white"
                style={{ backgroundColor: advisor.accentColor }}
              >
                {advisor.avatarInitials}
              </div>
              <p className="font-semibold">{translated.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {translated.mandate}
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
