export type ProtocolStatus =
  | "draft"
  | "planned"
  | "active"
  | "deprecated"
  | "retired";

export type ProtocolCategory =
  | "decision"
  | "safety"
  | "review"
  | "prompt"
  | "agent"
  | "research"
  | "execution";

export interface ProtocolActivation {
  triggers: string[];
  requiredInputs: string[];
  optionalInputs?: string[];
  stopConditions?: string[];
}

export interface ProtocolOutputStandard {
  format: "structured" | "narrative" | "hybrid";
  requiredSections: string[];
  mustIncludeEvidence: boolean;
  mustStateAssumptions: boolean;
  failureStates: Array<"needs_data" | "blocked" | "refused" | "unsupported">;
}

export interface NexusProtocol {
  id: string;
  name: string;
  description: string;
  category: ProtocolCategory;
  status: ProtocolStatus;
  version: string;
  route?: string;
  standardVersion?: string;
  activation?: ProtocolActivation;
  outputStandard?: ProtocolOutputStandard;
}
