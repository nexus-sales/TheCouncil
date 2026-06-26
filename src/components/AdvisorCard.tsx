import type { Advisor, AdvisorOpinion } from "@/core/types";
import { useLocale } from "@/lib/i18n";

interface AdvisorCardProps {
  advisor: Advisor;
  opinion: AdvisorOpinion;
}

export function AdvisorCard({ advisor, opinion }: AdvisorCardProps) {
  const { t } = useLocale();
  const translated = t.advisors[advisor.id];

  return (
    <article
      className="space-y-4 rounded-xl border bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:bg-white/[0.06]"
      style={{ borderColor: `${advisor.accentColor}30` }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white"
          style={{ backgroundColor: advisor.accentColor }}
        >
          {advisor.avatarInitials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold">{translated.name}</p>
          <p className="text-xs text-muted-foreground">{translated.role}</p>
        </div>
      </div>

      <div
        className="rounded-lg px-4 py-3 text-sm font-medium"
        style={{
          backgroundColor: `${advisor.accentColor}15`,
          color: advisor.accentColor,
        }}
      >
        {opinion.verdict}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {opinion.reasoning}
      </p>

      {opinion.evidence && opinion.evidence.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase text-muted-foreground">
            {t.card.evidence}
          </p>
          <ul className="space-y-1.5">
            {opinion.evidence.map((item, index) => (
              <li key={index} className="flex gap-2 text-xs text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
