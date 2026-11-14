# AGENTS.md — IrrigationNeed / Day 36

This file is binding guidance for coding agents and contributors. Read the root README, the currently tracked source code, `notebooks/irrigationneed.ipynb`, and the experiment manifest **before** proposing changes. Source-of-truth order: (1) original data + executable notebook and committed source; (2) machine-generated aggregate reports; (3) this documentation; (4) screenshots and chat descriptions. Resolve conflicts by evidence, not guesses.

## Before / Now / Next
**Before:** dataset discovery, five-family inventory, primary-label selection. **Now:** train-only sklearn Pipeline, validation-only Random Forest selection, held-out within-source report, local FastAPI and React dashboard. **Next:** publisher rights, class-semantics verification, independent evaluation, automated tests, production hardening. Never mark planned items as completed.

## Filesystem invariants
- Preserve the established root: README.md, AGENTS.md, LICENSE, .gitignore, .env.example, `notebooks/`, `models/`, `reports/`, `assets/{plots,examples,screenshots,diagrams}/`, `backend/`, `frontend/`, `docs/`, `scripts/`.
- Do **not** create or commit a `datasets/` or `dataset/` directory; do not move, rename or delete existing user files without approval.
- Preserve the existing joblib, notebook, experiment outputs, plots and screenshot. Do not replace experimental evidence with generated examples.
- Do not modify application logic when the requested task is documentation-only. Any change must be reviewable via `git diff`.

## Scientific integrity
- Model task is **source-recorded irrigation binary classification**, **not** verified irrigation demand or agronomic prescription.
- Primary workbook: `second dataset collected.xlsx`; five exact feature names including typo `Soil Tempertuer`; target `irrigation` (0/1). Four extra source families were **audited only**.
- Train/validation/test 2,511/379/517 after chronological split and exact-signature purge. Do not tune or select on test. Class distribution shifted across periods; farm/site independence is unproven.
- Report 100% held-out metrics as **within-source and pending independent validation**. Distinguish validation, held-out internal test, external blind test, and observed UI inference.
- Do not invent units, crop code names, labels, precision, calibration, license terms, farm trials, deployments, or model explanations.
- New datasets require provenance (original URL, publisher, version, access date, license, intended role, limits), leakage checks, and training-only preprocessing.

## Backend rules
- Review `backend/app/main.py` first. Existing routes: `GET /api/v1/health`, `GET /api/v1/model`, `POST /api/v1/predict`.
- Keep input schema exact and validate missing/unexpected fields, finite numerics, and optional min/max bounds. Keep descriptive 4xx/5xx errors; never return synthetic predictions when model is unavailable.
- Only deserialize trusted `irrigation_champion.joblib`. Do not accept user-provided pickle/joblib artifacts. Note current backend model path is a constant; `.env.example` `MODEL_PATH` is not wired.
- Do not expose dev API to public network, log private raw measurements, or add physical actuator control without separate safety review.

## Frontend rules
- React + TypeScript + Vite and existing blue-gray UI are established. Preserve dynamic metadata-driven form, model status, explicit errors, and result provenance.
- Never represent `predict_proba` as calibrated confidence, display guessed units, or treat button `Refresh model` as joblib reload.
- Keep accessibility and mobile behavior, and test `npm run build` when modifying frontend.

## Testing and documentation rules
- Before changes: inspect Git status, relevant source and tests, record baseline. After: run code-specific checks; validate links and image paths in Markdown; verify numeric claims directly against JSON/CSV artifacts.
- Documentation under `docs/en/` and `docs/id/` must have **equal topic coverage and research rigor**, not mirror boilerplate. Component READMEs must describe actual component behavior. English root README links to Indonesian research documents.
- Render existing plot/screenshot files via relative Markdown image links, with captions and cautious interpretation; do not invent graphics.
- Tests not in repo cannot be claimed passing. For documentation-only changes, report link-audit results and note that runtime tests are not executed.

## Git hygiene / Definition of Done
- Preserve existing content in a backup when replacing docs; inspect `git diff --stat`, `git diff --check`, and `git status`.
- Use focused Conventional Commits, e.g. `docs: document Day36 evidence and full-stack prototype`.
- Do not commit `.env`, secrets, raw data, ZIP archives, virtual environments, or large derived logs. A tracked joblib already exists; do not silently rewrite its history.
- Done means file paths validated, numbers traceable, languages consistent, actual implementation stated, claim boundaries explicit, no unapproved code/data changes, and a reproducible change summary.

## Prohibited actions
No invented test claims, secret disclosure, forced Git push, destructive cleanup, license selection without permission, fake performance scores, opaque data reshuffling, or silent `joblib` deserialization from untrusted origins. Use human review for any actuation or field recommendation claim.
