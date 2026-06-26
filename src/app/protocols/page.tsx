import type { Metadata } from "next";
import { ProtocolBadge } from "@/components/protocols/ProtocolBadge";
import { getProtocolStatusLabel } from "../../../core/protocols/get-protocol";
import { nexusProtocols } from "../../../core/protocols/registry";

export const metadata: Metadata = {
  title: "Protocols - The Council",
  description: "Registered Nexus Protocols in The Council ecosystem.",
};

function formatCategory(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatVersion(version: string) {
  return `v${version.replace(/\.0$/, "")}`;
}

export default function ProtocolsPage() {
  return (
    <main className="px-4 py-12 md:py-16">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-white/50">Nexus Protocols</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Protocol registry
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            A read-only view of the protocol contracts currently registered in
            The Council ecosystem.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {nexusProtocols.map((protocol) => {
            const status = getProtocolStatusLabel(protocol.status);

            return (
              <article
                key={protocol.id}
                className="rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-sm shadow-black/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      {protocol.name}
                    </h2>
                    <p className="mt-1 text-xs text-white/45">
                      {formatVersion(protocol.version)}
                      {" \u00b7 "}
                      {status}
                      {" \u00b7 "}
                      {formatCategory(protocol.category)}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/55">
                    {status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {protocol.description}
                </p>

                <div className="mt-5">
                  <ProtocolBadge protocol={protocol} compact />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
