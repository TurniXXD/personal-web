# Codex Token Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move durable repository rules into a compact `AGENTS.md` router and add task-specific guidance that reduces repeated context, tool output, and validation loops.

**Architecture:** Keep only cross-cutting constraints in the root instruction file. Put detailed frontend, localization, integration, testing, release, and Codex workflow guidance in focused documents that agents read only when the task needs them.

**Tech Stack:** Markdown, pnpm monorepo conventions, Codex repository instructions.

**Spec:** Token-optimization audit in the Codex chat dated 2026-11-03.

## Global Constraints

- Do not change application behavior or dependencies.
- Preserve the generated `apps/web/AGENTS.md` block.
- Preserve every material repository rule while removing duplication from always-loaded context.
- Do not change global Codex configuration outside the repository.

## Review Focus

- A routine task must not require reading every reference document.
- UI, localization, API, testing, and release constraints must remain discoverable from the root router.
- Validation guidance must prevent repeated full-suite runs while preserving final verification.
- Workflow guidance must distinguish repository policy from global Codex settings.
- New prose must remain direct and scannable.

---

### Task 1: Compact repository instruction router

**Files:**

- Modify: `AGENTS.md`
- Create: `docs/agent/repository-layout.md`
- Create: `docs/agent/ui-and-css.md`
- Create: `docs/agent/localization-and-seo.md`
- Create: `docs/agent/api-and-observability.md`
- Create: `docs/agent/testing.md`
- Create: `docs/agent/release-and-dependencies.md`

**Interfaces:**

- Consumes: Existing repository instructions.
- Produces: A compact root router and focused task references.

- [x] Replace repeated detail and examples in `AGENTS.md` with durable constraints and contextual links.
- [x] Move each detailed rule into exactly one owning reference document.
- [x] Confirm the generated nested instruction file is unchanged.

### Task 2: Add token-efficient Codex workflow guidance

**Files:**

- Create: `docs/agent/codex-workflow.md`
- Create: `docs/agent/session-checkpoint-template.md`

**Interfaces:**

- Consumes: Findings from the token-optimization audit.
- Produces: Rules for chat boundaries, file reads, tool output, validation cadence, and model/tool routing.

- [x] Document one-objective-per-chat and milestone checkpoint behavior.
- [x] Set search, output-truncation, batching, and duplicate-read rules.
- [x] Document task-scoped tools and reasoning effort without editing global configuration.

### Task 3: Verify documentation

**Files:**

- Test: All changed Markdown files.

**Interfaces:**

- Consumes: Tasks 1 and 2.
- Produces: Formatted, internally linked documentation with a clean diff.

- [x] Run Prettier on the changed Markdown files.
- [x] Check links and instruction-file size.
- [x] Run `git diff --check` and inspect the final diff.
