# Council Protocol

Council is the first executable Nexus Protocol in The Council ecosystem. It
keeps the existing anti-complacency analysis behavior while giving the protocol
its own definition, prompt, and runtime preparation layer.

## Council Inside Nexus

Within Nexus, Council is a decision protocol. Its mission is to expose hidden
failure modes, useful disagreement, missing central data, and the next honest
decision before advice becomes overconfident.

The protocol definition lives in:

```text
core/protocols/council/council.definition.ts
```

It declares the protocol identity, version, category, status, activation rules,
principles, and output modes.

## Prompt Location

The current Council system prompt now lives in:

```text
core/protocols/council/council.prompt.ts
```

It is exported as `COUNCIL_SYSTEM_PROMPT`. The prompt content has not been
changed in this sprint.

## Runtime Role

The protocol runtime lives in:

```text
core/protocols/council/council.runtime.ts
```

`runCouncilProtocol(input)` prepares the protocol payload:

- `systemPrompt`
- `userInput`
- `mode`
- `consequenceLevel`
- `metadata`

The runtime does not call OpenAI directly. The existing API route remains
responsible for model execution.

## What Has Not Changed

This sprint does not change:

- The public Council analysis flow.
- The `/api/council` response contract.
- The OpenAI call location.
- The Council prompt content.
- The advisor logic.
- The result UI.

The only behavioral wiring change is that the API now imports the system prompt
from the Council protocol folder instead of reading the markdown prompt file at
request time.
