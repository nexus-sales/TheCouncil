import type {
  Advisor,
  CouncilMode,
  CouncilResult,
  DecisionInput,
} from "./types";

export const ADVISORS: Advisor[] = [
  {
    id: "opposer",
    name: "The Opposer",
    role: "Failure pressure test",
    mandate: "Find where this breaks first and attack it directly.",
    description: "Names the fragile assumption, earliest failure, and plausible downside.",
    avatarInitials: "OP",
    accentColor: "#EF4444",
  },
  {
    id: "first-principles",
    name: "First Principles",
    role: "Problem reframing",
    mandate: "Ignore the framed question and solve the real problem underneath.",
    description: "Challenges inherited assumptions and false binary choices.",
    avatarInitials: "FP",
    accentColor: "#0EA5E9",
  },
  {
    id: "amplifier",
    name: "The Amplifier",
    role: "Upside maximalist",
    mandate: "Only defend the upside. Do not name risks.",
    description: "Surfaces the overlooked opportunity and asymmetric upside.",
    avatarInitials: "AM",
    accentColor: "#10B981",
  },
  {
    id: "outsider",
    name: "External Observer",
    role: "Fresh eyes",
    mandate: "Say what an outsider sees in the first 30 seconds.",
    description: "Asks the obvious questions insiders stop asking.",
    avatarInitials: "EX",
    accentColor: "#F59E0B",
  },
  {
    id: "implementer",
    name: "The Implementer",
    role: "Monday morning action",
    mandate: "Turn the analysis into the first concrete move.",
    description: "Names the file, message, experiment, or conversation to do next.",
    avatarInitials: "IM",
    accentColor: "#8B5CF6",
  },
];

export const COUNCIL_MODES: Record<
  CouncilMode,
  { label: string; description: string }
> = {
  "app-code": {
    label: "App or code",
    description: "Review a product, repo, feature, UX, or technical direction.",
  },
  "idea-strategy": {
    label: "Idea or strategy",
    description: "Stress-test a business idea, product bet, market, or plan.",
  },
  decision: {
    label: "Decision",
    description: "Choose a move when the consequences matter.",
  },
};

export function buildUserPrompt(input: DecisionInput): string {
  const lines: string[] = [
    `Output language: ${input.locale === "en" ? "English" : "Spanish"}`,
    `Decision or question: ${input.question}`,
    `Mode: ${input.mode ?? "decision"}`,
    `Stakes level: ${input.stakes ?? "medium"}`,
  ];

  if (input.context?.trim()) {
    lines.push(`Context: ${input.context.trim()}`);
  }

  const options = input.options?.filter((option) => option.trim() !== "");
  if (options?.length) {
    lines.push("Options being considered:");
    options.forEach((option, index) => {
      lines.push(`${index + 1}. ${option}`);
    });
  }

  return lines.join("\n");
}

export function buildCouncilResult(
  input: DecisionInput,
  rawResponse: Partial<CouncilResult>
): CouncilResult {
  const status = rawResponse.status === "needs_data" ? "needs_data" : "analysis";

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    input,
    status,
    analyzed: rawResponse.analyzed ?? input.question,
    escalation:
      rawResponse.escalation === "full" || input.stakes === "high" || input.stakes === "critical"
        ? "full"
        : "light",
    mode: rawResponse.mode ?? input.mode ?? "decision",
    assumptions: Array.isArray(rawResponse.assumptions)
      ? rawResponse.assumptions
      : [],
    missingDataQuestion: rawResponse.missingDataQuestion,
    whyCouncilPaused: rawResponse.whyCouncilPaused,
    advisors: Array.isArray(rawResponse.advisors) ? rawResponse.advisors : [],
    chairman: rawResponse.chairman,
  };
}
