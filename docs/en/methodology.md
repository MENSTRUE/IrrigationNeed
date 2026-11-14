# Methodology — IrrigationNeed

## Research question and design
**Question:** how accurately can a supervised classifier reproduce source-recorded irrigation states from contemporaneous environment features under a chronological split? **Not asked:** what water quantity or time is optimal for a crop.

## Input and preprocessing
Five numeric columns: `crop type`, `Temperature`, `Humidity`, `Soil Moisture`, `Soil Tempertuer` (the last spelling is the **literal source column**). The label is `irrigation`. `Time` is used only to order observations and `best time` is excluded as potentially downstream. Columns are standardized by trimming surrounding whitespace; model inputs are converted with `pd.to_numeric(errors="coerce")`. Missing target rows are removed; missing predictors are imputed by `SimpleImputer(strategy="median")`, fit **on training only** within sklearn pipelines.

## Split and selection
Sort by parsed timestamp, quarantine feature signatures with conflicting labels, split at the 70% and 85% **distinct timestamp** cut points, then purge from later partitions any exact input signature previously seen. Final sets: train 2,511 (2,388/123 for classes 0/1); validation 379 (168/211); test 517 (285/232). This is chronological but **not a farm-independent test**. Compare Dummy majority, Logistic Regression (standardization) and Random Forest; select on validation macro-F1, then balanced accuracy as tie-breaker; evaluate held-out test once.

## Final estimator
Random Forest pipeline: median imputer → `RandomForestClassifier(n_estimators=300, min_samples_leaf=3, class_weight="balanced_subsample", n_jobs=-1, random_state=42)`. The exported model remains train-fitted; validation/test samples are not refit into it.

## Evidence and interpretation
The experiment classifies the **source-recorded `irrigation` column**, not independently measured agronomic water need. The source did not establish a verified field-level irrigation prescription. The held-out 100% score is a *within-source, post-purge observation*, not prospective performance, robustness, or external validation. Exact sensor-signature de-duplication does not establish independent farms or remove near-duplicates. Probability calibration is untested.

## Evidence files
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — setup, features, split, model selection, hashes and limitations.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — test metrics and confusion matrix.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — exact-signature overlap.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — counts and time periods.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — validation-only selection.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — unresolved source licensing.
