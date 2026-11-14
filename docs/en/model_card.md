# Model Card — IrrigationNeed

## Identity and intended use
**Name:** `irrigation_champion.joblib`. **Task:** binary classification of recorded irrigation labels. **Champion:** sklearn pipeline with median imputer and Random Forest. Intended for education, reproducible research, and demo inference. **Not intended:** actuation of pumps, water-volume scheduling, water conservation guarantees, plant health diagnosis, or unassisted agricultural decisions.

## Input/output contract
Input is a one-row pandas DataFrame with exact case-sensitive names and order: `crop type`, `Temperature`, `Humidity`, `Soil Moisture`, `Soil Tempertuer`. The source's unusual `Tempertuer` spelling is intentional. Five numeric inputs; no verified unit definitions or crop-code names in the repository. Classes 0/1 represent source-recorded no-irrigation/irrigation labels. The API returns raw prediction, optional `display_label`, and `class_probabilities` if the model supports them; without `models/inference_schema.json`, labels remain numeric in the UI.

## Training and evaluation
See methodology and evaluation. Source SHA-256: `f776f34fc9c7be1eef59614dc41ddeadef6fde9dc11d908c4ec8a513d6af4d2d`; expected model SHA-256 from experiment manifest: `835ce8cfa81402276f0795197a5eff4fab064383b583a342cff91c9b01d80593`. Compare local artifact hash before using as research evidence.

## Risk
Potential serial dependence, source-label circularity, domain shift, limited observation window, class imbalance over time, unknown units, and unknown probability calibration. No farmer field trial or prospective validation has been recorded. Joblib deserialization can execute code; load only trusted files.

## Evidence and interpretation
The experiment classifies the **source-recorded `irrigation` column**, not independently measured agronomic water need. The source did not establish a verified field-level irrigation prescription. The held-out 100% score is a *within-source, post-purge observation*, not prospective performance, robustness, or external validation. Exact sensor-signature de-duplication does not establish independent farms or remove near-duplicates. Probability calibration is untested.

## Evidence files
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — setup, features, split, model selection, hashes and limitations.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — test metrics and confusion matrix.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — exact-signature overlap.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — counts and time periods.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — validation-only selection.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — unresolved source licensing.
