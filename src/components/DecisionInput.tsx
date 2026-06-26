"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n";
import type {
  CouncilMode,
  CouncilResult,
  DecisionInput as TDecisionInput,
  StakesLevel,
} from "@/core/types";

const STAKES: StakesLevel[] = ["low", "medium", "high", "critical"];
const MODES: CouncilMode[] = ["app-code", "idea-strategy", "decision"];

export function DecisionInput() {
  const router = useRouter();
  const { locale, t } = useLocale();
  const [form, setForm] = useState<TDecisionInput>({
    question: "",
    context: "",
    options: [""],
    stakes: "medium",
    mode: "decision",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateOption = (index: number, value: string) => {
    const updated = [...(form.options ?? [])];
    updated[index] = value;
    setForm((current) => ({ ...current, options: updated }));
  };

  const addOption = () =>
    setForm((current) => ({
      ...current,
      options: [...(current.options ?? []), ""],
    }));

  const removeOption = (index: number) =>
    setForm((current) => ({
      ...current,
      options: (current.options ?? []).filter((_, itemIndex) => itemIndex !== index),
    }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload: TDecisionInput = {
        ...form,
        locale,
        options: form.options?.filter((option) => option.trim() !== ""),
      };

      const response = await fetch("/api/council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Unknown error");
      }

      const result: CouncilResult = await response.json();
      sessionStorage.setItem(`council-${result.id}`, JSON.stringify(result));
      router.push(`/decision/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.form.unknownError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="question">
          {t.form.questionLabel} <span className="text-red-400">*</span>
        </label>
        <Textarea
          id="question"
          placeholder={t.form.questionPlaceholder}
          value={form.question}
          onChange={(event) =>
            setForm((current) => ({ ...current, question: event.target.value }))
          }
          rows={3}
          required
          className="resize-none border-white/10 bg-white/5 placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t.form.modeLabel}</label>
        <div className="grid gap-2 md:grid-cols-3">
          {MODES.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setForm((current) => ({ ...current, mode: value }))}
              className={`rounded-lg border p-3 text-left transition-colors ${
                form.mode === value
                  ? "border-sky-400/60 bg-sky-500/10"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
              }`}
            >
              <span className="block text-sm font-semibold">
                {t.modes[value].label}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                {t.modes[value].description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="context">
          {t.form.contextLabel}{" "}
          <span className="text-xs text-muted-foreground">({t.form.optional})</span>
        </label>
        <Textarea
          id="context"
          placeholder={t.form.contextPlaceholder}
          value={form.context}
          onChange={(event) =>
            setForm((current) => ({ ...current, context: event.target.value }))
          }
          rows={5}
          className="resize-none border-white/10 bg-white/5 placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          {t.form.optionsLabel}{" "}
          <span className="text-xs text-muted-foreground">({t.form.optional})</span>
        </label>
        <div className="space-y-2">
          {(form.options ?? []).map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder={`${t.form.optionPlaceholder} ${index + 1}`}
                value={option}
                onChange={(event) => updateOption(index, event.target.value)}
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {(form.options?.length ?? 0) > 1 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="h-9 w-9 shrink-0 rounded-md border border-white/10 text-muted-foreground hover:text-destructive"
                  aria-label={`${t.form.removeOption} ${index + 1}`}
                >
                  x
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="text-sm text-sky-400 hover:text-sky-300"
          >
            {t.form.addOption}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t.form.stakesLabel}</label>
        <div className="flex flex-wrap gap-2">
          {STAKES.map((stakes) => (
            <button
              key={stakes}
              type="button"
              onClick={() => setForm((current) => ({ ...current, stakes }))}
              className={`rounded-md px-4 py-1.5 text-sm capitalize transition-colors ${
                form.stakes === stakes
                  ? "bg-sky-600 text-white"
                  : "border border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
              }`}
            >
              {t.stakes[stakes]}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <Card className="border-red-500/20 bg-red-500/10">
          <CardContent className="pt-4 text-sm text-red-400">{error}</CardContent>
        </Card>
      )}

      <Button
        type="submit"
        disabled={loading || !form.question.trim()}
        size="lg"
        className="w-full bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50"
      >
        {loading ? t.form.loading : t.form.submit}
      </Button>
    </form>
  );
}
