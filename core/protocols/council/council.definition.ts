import type {
  NexusProtocol,
  ProtocolActivation,
  ProtocolCategory,
  ProtocolStatus,
} from "../types";

export interface CouncilProtocolDefinition extends NexusProtocol {
  id: "council";
  category: Extract<ProtocolCategory, "decision">;
  status: Extract<ProtocolStatus, "active">;
  mission: string;
  activation: ProtocolActivation;
  principles: string[];
  outputModes: Array<"analysis" | "needs_data">;
}

export const councilProtocol: CouncilProtocolDefinition = {
  id: "council",
  name: "Council",
  description:
    "Anti-complacency decision protocol that challenges a question through opposing advisory roles and synthesizes one actionable decision.",
  version: "1.0.0",
  standardVersion: "1.0.0",
  category: "decision",
  status: "active",
  route: "/api/council",
  mission:
    "Expose hidden failure modes, useful disagreement, missing central data, and the next honest decision.",
  activation: {
    triggers: [
      "A user asks for a decision, product, code, idea, or strategy judgment.",
      "The answer benefits from structured disagreement before synthesis.",
      "The stakes justify checking assumptions before producing advice.",
    ],
    requiredInputs: ["question"],
    optionalInputs: ["context", "options", "stakes", "mode", "locale"],
    stopConditions: [
      "The central fact needed for analysis is missing.",
      "The request is trivial unless the user's framing makes the stakes real.",
      "The request would require inventing evidence.",
    ],
  },
  principles: [
    "Run the central data test before convening advisors.",
    "Each advisor commits blindly to its strongest mandate.",
    "Treat easy convergence as suspicious until the Chairman runs a groupthink check.",
    "Return one decision, sequence, or central datum instead of a menu.",
    "Be hard on the idea and humane with the person.",
  ],
  outputModes: ["analysis", "needs_data"],
};
