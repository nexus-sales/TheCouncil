# The Council

The Council is a Next.js app for anti-complacency decision analysis. It convenes
five advisors with opposing mandates, checks whether a central datum is missing,
and returns a Chairman synthesis with one decision.

## Getting started

Create `.env.local` with:

```bash
OPENAI_API_KEY=your_api_key
```

Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product model

- `app-code`: reviews apps, code, UX, product flow, and technical direction.
- `idea-strategy`: stress-tests ideas, business strategy, markets, and plans.
- `decision`: handles high-consequence choices and tradeoffs.

The API can return either:

- `status: "analysis"` with five advisors and a Chairman synthesis.
- `status: "needs_data"` when the missing central fact would make advice invented.

## Project structure

```text
src/
  app/          Next.js App Router pages and API routes
  components/   React UI components
  core/         Council types, advisor registry, and system prompt
  lib/          OpenAI client and utilities
docs/
  council.md   API and behavior contract
```
