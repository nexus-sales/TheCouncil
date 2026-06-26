import type { NexusProtocol } from "./types";

export const nexusProtocols = [
  {
    id: "council",
    name: "Council",
    description:
      "Anti-complacency decision protocol that challenges a question through opposing advisory roles and synthesizes one actionable decision.",
    category: "decision",
    status: "active",
    version: "1.0.0",
    route: "/api/council",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    description:
      "Safety and risk protocol for detecting fragile assumptions, unsafe actions, and evidence gaps before execution.",
    category: "safety",
    status: "planned",
    version: "0.1.0",
  },
  {
    id: "nexus-review",
    name: "Nexus Review",
    description:
      "Review protocol for evaluating code, product decisions, documentation, or workflows against evidence and user impact.",
    category: "review",
    status: "planned",
    version: "0.1.0",
  },
  {
    id: "prompt-protocol",
    name: "Prompt Protocol",
    description:
      "Prompt design protocol for transforming intent, constraints, and examples into reliable instruction contracts.",
    category: "prompt",
    status: "planned",
    version: "0.1.0",
  },
  {
    id: "agent-protocol",
    name: "Agent Protocol",
    description:
      "Agent behavior protocol for defining tool use, autonomy, safety boundaries, and completion criteria.",
    category: "agent",
    status: "planned",
    version: "0.1.0",
  },
  {
    id: "cosmos-protocol",
    name: "Cosmos Protocol",
    description:
      "Research and exploration protocol for mapping broad problem spaces into structured, evidence-aware outputs.",
    category: "research",
    status: "planned",
    version: "0.1.0",
  },
] satisfies NexusProtocol[];

export type NexusProtocolId = (typeof nexusProtocols)[number]["id"];

export function getNexusProtocol(id: NexusProtocolId): NexusProtocol | undefined {
  return nexusProtocols.find((protocol) => protocol.id === id);
}
