# The Council v2

The Council is an anti-complacency decision system. It does not simply produce
five agreeable perspectives. It first checks whether the central data exists,
then convenes five advisors with opposing mandates, and finally asks a Chairman
to synthesize one decision.

## Advisors

| Advisor | Mandate |
| --- | --- |
| The Opposer | Find where this breaks first and attack it directly. |
| First Principles | Ignore the framed question and solve the real problem underneath. |
| The Amplifier | Only defend the upside. Do not name risks. |
| External Observer | Say what an outsider sees in the first 30 seconds. |
| The Implementer | Turn the analysis into the first concrete move. |

## Operating rules

1. Run the central data test before convening.
2. Let each advisor commit blindly to its mandate.
3. Treat easy convergence as suspicious and run a groupthink check.
4. Make the Chairman choose one decision, sequence, or missing datum.

## API

### `POST /api/council`

Request body:

```json
{
  "question": "string",
  "context": "string",
  "options": ["string"],
  "stakes": "low | medium | high | critical",
  "mode": "app-code | idea-strategy | decision"
}
```

Analysis response:

```json
{
  "id": "uuid",
  "createdAt": "ISO 8601",
  "status": "analysis",
  "analyzed": "one-line description",
  "escalation": "light | full",
  "mode": "decision",
  "assumptions": [],
  "advisors": [
    {
      "advisorId": "opposer",
      "advisorName": "The Opposer",
      "mandate": "Find where this breaks first and attack it directly.",
      "verdict": "one strong sentence",
      "reasoning": "specific analysis",
      "evidence": ["optional support"]
    }
  ],
  "chairman": {
    "convergence": "string",
    "groupthinkCheck": "string",
    "tension": "string",
    "invalidated": "string",
    "decision": "string",
    "selfAttack": "string",
    "minorityCost": "string"
  }
}
```

If the central data is missing, the API returns `status: "needs_data"` with a
single `missingDataQuestion` and no advisor analysis.
