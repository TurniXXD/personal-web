# Token-efficient Codex workflow

Read this document for long, exploratory, tool-heavy, or multi-stage work. The goal is fewer tokens per completed task, not fewer tokens per individual call.

## Chat boundaries

- Give each chat one coherent objective.
- Start a fresh chat after completing the objective or when the scope becomes unrelated.
- At a debugging or implementation milestone within the same objective, write a checkpoint and compact only if the active context has become large.
- Before ending a long chat, write a checkpoint using `docs/agent/session-checkpoint-template.md`.
- Keep the latest decisions, affected files, verification state, and remaining work. Drop superseded reads, resolved failures, and intermediate speculation.
- Use compaction for one continuing objective. Use a new chat when the objective changes.

## Supplying context

- Point to repository paths instead of pasting full files.
- Mention a skill by name; do not manually paste its `SKILL.md` when Codex can load it.
- Keep task prompts to the desired outcome, scope, constraints, and acceptance criteria.
- Put large research notes, command logs, and generated reports in files. Carry their path and a short summary in chat.

## Reading and searching

- Use `rg` or `rg --files` to narrow candidates before opening files.
- Batch independent reads and searches in one tool round.
- Do not reread unchanged files. Record the current file set and decisions in the checkpoint when a task spans many turns.
- Search source directories by default. Exclude `.next`, `.next-dev`, `node_modules`, `test-results`, and generated output.
- Inspect compiled output only when debugging compilation, bundling, or runtime artifacts, and target the smallest known file or chunk.

## Tool output

- Keep each model-visible observation below roughly 10,000 tokens or 40KB.
- For long output, preserve the beginning, the end, the exit code, and a path to the full log. Truncate the middle.
- Summarize successful lint, typecheck, build, and test runs instead of carrying their full output.
- Limit searches by path, glob, match count, or context lines.
- Use a 1280×720 browser viewport for routine UI inspection. Increase resolution only when text or visual detail requires it.

## Loop control

- Plan independent reads and checks before calling tools, then run them together.
- Do not poll long builds or servers through repeated model turns. Use background execution and inspect the result when it finishes.
- After five failures of the same operation, stop retrying, summarize the evidence, and change approach or request missing input.
- Follow the validation cadence in `docs/agent/testing.md`; do not rerun full gates without a relevant change.

## Model and tool routing

- Use low or medium reasoning for lookups, focused edits, formatting, lint fixes, and routine verification.
- Use high reasoning for architecture, difficult debugging, broad refactors, and decisions spanning multiple domains.
- Enable external plugins or MCP servers only for the task that needs them. A repository document cannot enforce global Codex settings, so review the active tool profile before long work.
- Prefer repository CLIs over equivalent MCP tools when both provide the same capability.
- For local web UI testing, prefer Playwright. Reserve general computer-use automation for native UI, browser state that Playwright cannot access, or explicitly requested manual flows.
- Use image generation, Figma, Notion, Vercel, document, spreadsheet, presentation, PDF, Fusion, or visualization tools only when the task calls for them.

## Responses

- Lead with the result and keep progress updates to decisions, findings, and next actions.
- Reference changed files instead of reproducing them.
- Report failed or skipped verification explicitly; omit routine command transcripts.
