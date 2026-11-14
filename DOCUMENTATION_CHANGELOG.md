# Documentation-only change report — IrrigationNeed

Repository: MENSTRUE/IrrigationNeed; audited public main tree 2026-11-14.

- Replaced root README and root AGENTS.md in the **install package** with actual implementation status and evidence-linked claims. The original local Markdown files must be backed up by installer before replacement.
- Added EN/ID research documentation on dataset provenance, methodology, experiments, model card, evaluation, limitations, architecture, reproducibility, deployment, and troubleshooting (topic parity).
- Added documentation indexes and component READMEs; backend/frontend-specific AGENTS.md.
- Rendered genuine plot and app screenshot via path-valid relative links.
- Kept LICENSE undecided, avoided changes to app/source/model/data, and documented unresolved source rights.
- Documented one observed local inference, reported within-source 100% scores with clear non-generalization caveat, and known missing inference schema.

## QA boundaries
The relative-path audit checks references against the **GitHub repository tree snapshot plus package files**; runtime integration, original publisher rights, and raw artifact hash are not independently verified. Documentation must be installed into a current local clone and reviewed with `git diff`. Do not mistake this ZIP for a GitHub push.

## Suggested commit
`docs: add evidence-backed bilingual IrrigationNeed documentation`
