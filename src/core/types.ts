export type CouncilMode = "app-code" | "idea-strategy" | "decision";

export type StakesLevel = "low" | "medium" | "high" | "critical";

export type CouncilStatus = "analysis" | "needs_data";

export type Locale = "en" | "es";

export type AdvisorId =
  | "opposer"
  | "first-principles"
  | "amplifier"
  | "outsider"
  | "implementer";

export interface Advisor {
  id: AdvisorId;
  name: string;
  role: string;
  mandate: string;
  description: string;
  avatarInitials: string;
  accentColor: string;
}

export interface DecisionInput {
  question: string;
  context?: string;
  options?: string[];
  stakes?: StakesLevel;
  mode?: CouncilMode;
  locale?: Locale;
}

export interface AdvisorOpinion {
  advisorId: AdvisorId;
  advisorName: string;
  mandate: string;
  verdict: string;
  reasoning: string;
  evidence?: string[];
}

export interface ChairmanSynthesis {
  convergence: string;
  groupthinkCheck: string;
  tension: string;
  invalidated: string;
  decision: string;
  selfAttack: string;
  minorityCost: string;
}

export interface CouncilResult {
  id: string;
  createdAt: string;
  input: DecisionInput;
  status: CouncilStatus;
  analyzed: string;
  escalation: "light" | "full";
  mode: CouncilMode;
  assumptions: string[];
  missingDataQuestion?: string;
  whyCouncilPaused?: string;
  advisors: AdvisorOpinion[];
  chairman?: ChairmanSynthesis;
}
