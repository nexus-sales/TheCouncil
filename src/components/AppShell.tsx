"use client";

import Link from "next/link";
import { LocaleProvider, useLocale } from "@/lib/i18n";
import type { Locale } from "@/core/types";

interface AppShellProps {
  children: React.ReactNode;
}

function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  const options: { value: Locale; label: string }[] = [
    { value: "es", label: "ES" },
    { value: "en", label: "EN" },
  ];

  return (
    <div
      aria-label={t.nav.language}
      className="flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLocale(option.value)}
          className={`h-7 rounded-md px-2 text-xs font-semibold transition-colors ${
            locale === option.value
              ? "bg-sky-600 text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function ShellContent({ children }: AppShellProps) {
  const { t } = useLocale();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(14,165,233,0.08),transparent_280px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:auto,64px_64px,64px_64px]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <span className="truncate text-xl font-bold tracking-tight">
              The Council
            </span>
            <span className="rounded-md border border-sky-400/30 px-2 py-0.5 text-xs text-sky-300">
              v2
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle />
            <Link
              href="/new"
              className="inline-flex h-8 items-center justify-center rounded-lg border border-white/10 px-3 text-sm font-medium transition-colors hover:bg-white/5"
            >
              {t.nav.newDecision}
            </Link>
          </div>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <LocaleProvider>
      <ShellContent>{children}</ShellContent>
    </LocaleProvider>
  );
}
