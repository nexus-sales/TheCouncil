import { nexusProtocols } from "./registry";
import type { NexusProtocol, ProtocolStatus } from "./types";

const statusLabels: Record<ProtocolStatus, string> = {
  draft: "Draft",
  planned: "Planned",
  active: "Active",
  deprecated: "Deprecated",
  retired: "Retired",
};

export function getProtocolById(id: string): NexusProtocol | undefined {
  return nexusProtocols.find((protocol) => protocol.id === id);
}

export function getActiveProtocols(): NexusProtocol[] {
  return nexusProtocols.filter((protocol) => protocol.status === "active");
}

export function getProtocolStatusLabel(status: ProtocolStatus): string {
  return statusLabels[status];
}
