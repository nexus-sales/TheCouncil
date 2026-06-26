# Nexus Standard v1.0

## Purpose

Nexus Standard v1.0 defines the common foundation for all Nexus Protocols in
The Council ecosystem: Council, Sentinel, Nexus Review, Prompt Protocol, Agent
Protocol, Cosmos Protocol, and future protocols.

> Un protocolo Nexus no existe para sonar inteligente. Existe para mejorar el
> resultado del usuario de forma verificable.

## What Is a Nexus Protocol

A Nexus Protocol is a structured operating contract for a repeatable reasoning,
review, safety, or execution workflow. It defines when the protocol should be
activated, what evidence it needs, how it must reason, what it must produce, and
which safety limits it must respect.

A valid protocol is not only a prompt. It is a documented pattern with a stable
identity, explicit scope, evidence rules, output rules, and versioned behavior.

## What Is Not a Nexus Protocol

A Nexus Protocol is not:

- A marketing label for a generic AI response.
- A personality, style preset, or tone wrapper.
- A hidden chain-of-thought request.
- A collection of clever phrases without measurable user value.
- A workflow that cannot explain its inputs, assumptions, risks, and output.
- A mechanism for bypassing product, security, privacy, or user constraints.

## Required Protocol Structure

Every Nexus Protocol must define:

1. `id`: stable machine-readable identifier.
2. `name`: human-readable protocol name.
3. `description`: concise statement of the protocol's purpose.
4. `category`: operational category.
5. `status`: lifecycle status.
6. `version`: semantic version for the protocol contract.
7. `activation`: conditions that justify running the protocol.
8. `inputs`: required and optional input fields.
9. `evidence`: data, references, context, or checks required before output.
10. `process`: high-level reasoning and validation steps.
11. `output`: expected shape, constraints, and failure states.
12. `safety`: boundaries, refusal rules, and escalation conditions.
13. `owner`: responsible maintainer or domain.
14. `changelog`: notable changes between versions.

## Common Principles

- User outcome over protocol theater.
- Explicit scope over vague authority.
- Evidence before confidence.
- Clear assumptions over hidden certainty.
- Minimal output that still preserves decision quality.
- Safety constraints are part of the protocol, not an afterthought.
- The protocol should improve with versioning, tests, and real usage.
- A protocol may pause when the missing evidence would materially change the
  answer.

## Evidence Rules

Every protocol must state what counts as evidence for its domain.

Evidence can include:

- User-provided context.
- Repository files, logs, tests, or runtime output.
- Product requirements and constraints.
- External references when the workflow explicitly allows them.
- Directly stated assumptions when evidence is incomplete.

Evidence rules:

- Do not invent facts to complete a protocol.
- Separate observed evidence from inference.
- Mark uncertainty when evidence is partial.
- Ask for missing information when guessing would create material risk.
- Prefer fresh verification for drift-prone facts.
- Keep evidence traceable enough that a user can challenge the conclusion.

## Output Rules

Protocol output must be useful, bounded, and auditable.

Every output should:

- State the result or recommendation clearly.
- Include the minimum evidence needed to trust the result.
- Identify assumptions, tradeoffs, or unresolved risks.
- Preserve user constraints.
- Avoid decorative complexity.
- Avoid exposing hidden reasoning or internal-only deliberation.
- Use structured sections when structure improves actionability.

When a protocol cannot produce a reliable result, it must return a pause,
needs-data, blocked, or refusal state instead of pretending certainty.

## Safety Rules

Every protocol must respect:

- User intent and explicit constraints.
- Data privacy and secret-handling boundaries.
- Product security requirements.
- Legal, medical, financial, and operational risk boundaries.
- Repository and deployment safety.
- Non-destructive defaults unless the user explicitly authorizes risk.

A protocol must refuse, pause, or escalate when:

- The requested action is unsafe or disallowed.
- The protocol lacks required evidence for a high-impact decision.
- The output would misrepresent uncertainty as fact.
- The workflow requires permissions or capabilities not currently available.

## Versioning

Nexus Protocols use semantic versioning:

- `MAJOR`: breaking changes to activation, evidence, safety, or output contract.
- `MINOR`: backward-compatible capability additions.
- `PATCH`: clarifications, copy edits, or non-breaking fixes.

The standard itself is versioned separately from individual protocols. Protocols
must declare which standard version they follow.

## Initial Protocol Registry

| ID | Name | Category | Status | Version |
| --- | --- | --- | --- | --- |
| `council` | Council | decision | active | `1.0.0` |
| `sentinel` | Sentinel | safety | planned | `0.1.0` |
| `nexus-review` | Nexus Review | review | planned | `0.1.0` |
| `prompt-protocol` | Prompt Protocol | prompt | planned | `0.1.0` |
| `agent-protocol` | Agent Protocol | agent | planned | `0.1.0` |
| `cosmos-protocol` | Cosmos Protocol | research | planned | `0.1.0` |

This registry is the initial source of truth. Future implementations may expose
it through UI, API, or tooling, but Nexus Standard v1.0 does not require any
runtime behavior change.
