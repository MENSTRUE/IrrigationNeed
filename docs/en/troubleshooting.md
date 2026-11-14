# Troubleshooting — IrrigationNeed

## Backend says model unavailable
Run `GET http://127.0.0.1:8000/api/v1/model` and inspect its `reason` field. Verify `models/irrigation_champion.joblib` exists; run `python scripts/inspect_model.py` in a **trusted environment**. The model must expose `predict` and feature names (`feature_names_in_`) or have an explicit schema. Beware pickle/joblib execution risks.

## HTTP 422 on prediction
POST JSON must contain **exactly** `crop type`, `Temperature`, `Humidity`, `Soil Moisture`, `Soil Tempertuer` as `features` keys; all five are numeric. Spelling and capitalization matter. Strings that parse as numeric are accepted server-side; booleans, NaN/Infinity, unknown and missing keys are not. Configured min/max validation applies only when schema file contains bounds.

## HTTP 500 on inference
Check Python traceback in Uvicorn logs. Verify model was fitted as a pipeline, sklearn version compatibility, feature order and expected types; do not silently retrain or change the feature set to hide errors.

## Frontend cannot reach API
Start backend on port 8000 first. Vite config forwards `/api` to `http://127.0.0.1:8000`; run frontend from its own folder (`npm ci`, `npm run dev`). Check browser devtools Network and terminal errors.

## Model labels are just `0` and `1`
Current repo does not contain `models/inference_schema.json`. Backend defaults to raw string labels. Confirm source mapping against experiment manifest; optionally add schema with exact features, options and `prediction_labels`. Never guess physical units or crop identities.

## Refresh button does not use updated checkpoint
This UI control re-fetches `GET /api/v1/model` only. Restart Uvicorn to run `load_model()` on startup; verify active artifact hash and repeat prediction.

## Evidence and interpretation
The experiment classifies the **source-recorded `irrigation` column**, not independently measured agronomic water need. The source did not establish a verified field-level irrigation prescription. The held-out 100% score is a *within-source, post-purge observation*, not prospective performance, robustness, or external validation. Exact sensor-signature de-duplication does not establish independent farms or remove near-duplicates. Probability calibration is untested.

## Evidence files
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — setup, features, split, model selection, hashes and limitations.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — test metrics and confusion matrix.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — exact-signature overlap.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — counts and time periods.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — validation-only selection.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — unresolved source licensing.
