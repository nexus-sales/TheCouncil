import { buildUserPrompt } from "../../../src/core/council";
import type { CouncilMode, DecisionInput, StakesLevel } from "../../../src/core/types";
import { councilProtocol } from "./council.definition";
import { COUNCIL_SYSTEM_PROMPT } from "./council.prompt";

export type CouncilProtocolRuntimeInput = DecisionInput;

export interface CouncilProtocolRuntimePayload {
  systemPrompt: string;
  userInput: string;
  mode: CouncilMode;
  consequenceLevel: StakesLevel;
  metadata: {
    protocolId: typeof councilProtocol.id;
    protocolName: typeof councilProtocol.name;
    protocolVersion: typeof councilProtocol.version;
    standardVersion: string;
    route?: string;
  };
}

export function runCouncilProtocol(
  input: CouncilProtocolRuntimeInput
): CouncilProtocolRuntimePayload {
  const normalizedInput: DecisionInput = {
    ...input,
    mode: input.mode ?? "decision",
    stakes: input.stakes ?? "medium",
    locale: input.locale === "en" ? "en" : "es",
  };

  return {
    systemPrompt: COUNCIL_SYSTEM_PROMPT,
    userInput: buildUserPrompt(normalizedInput),
    mode: normalizedInput.mode ?? "decision",
    consequenceLevel: normalizedInput.stakes ?? "medium",
    metadata: {
      protocolId: councilProtocol.id,
      protocolName: councilProtocol.name,
      protocolVersion: councilProtocol.version,
      standardVersion: councilProtocol.standardVersion ?? "1.0.0",
      route: councilProtocol.route,
    },
  };
}
