import {
  getProtocolById,
  getProtocolStatusLabel,
} from "../../../core/protocols/get-protocol";
import type { NexusProtocol } from "../../../core/protocols/types";

interface ProtocolBadgeProps {
  protocol?: NexusProtocol;
  protocolId?: string;
  compact?: boolean;
}

function formatVersion(version: string) {
  return `v${version.replace(/\.0$/, "")}`;
}

function formatCategory(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ProtocolBadge({
  protocol,
  protocolId,
  compact = false,
}: ProtocolBadgeProps) {
  const resolvedProtocol =
    protocol ?? (protocolId ? getProtocolById(protocolId) : undefined);

  if (!resolvedProtocol) return null;

  const status = getProtocolStatusLabel(resolvedProtocol.status);
  const category = formatCategory(resolvedProtocol.category);
  const title = resolvedProtocol.name.endsWith("Protocol")
    ? resolvedProtocol.name
    : `${resolvedProtocol.name} Protocol`;

  return (
    <div
      className={`inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] text-white/90 shadow-sm shadow-black/10 backdrop-blur-md ${
        compact ? "px-3 py-1 text-xs" : "px-3.5 py-2 text-sm"
      }`}
    >
      <span className="truncate font-medium tracking-normal">{title}</span>
      <span className="h-1 w-1 rounded-full bg-white/35" aria-hidden="true" />
      <span className="shrink-0 text-white/55">
        {formatVersion(resolvedProtocol.version)}
        {" \u00b7 "}
        {status}
        {" \u00b7 "}
        {category}
      </span>
    </div>
  );
}
