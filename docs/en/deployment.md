# Deployment — IrrigationNeed

## Local development (implemented)
In PowerShell terminal A, at repository root:
```powershell
& 'C:\DevEnvs\ai-general\Scripts\python.exe' -m pip install -r backend\requirements.txt
& 'C:\DevEnvs\ai-general\Scripts\python.exe' -m uvicorn backend.app.main:app --reload --port 8000
```
Terminal B:
```powershell
cd frontend
npm ci
npm run dev
```
Access API at `http://127.0.0.1:8000/docs` and dashboard at `http://127.0.0.1:5173`. For frontend validation, run `npm run build` in `frontend/`. The app has been demonstrated locally with one input but no automated integration-test suite is present in the GitHub tree.

## Readiness boundaries
This is **not production deployed**. Uvicorn reload, local CORS, no authentication, no TLS termination, no rate limiting, and model stored alongside code are development choices. Restrict network exposure. Never deserialize untrusted joblib. Add model integrity checks, request limits, telemetry without sensitive raw sensor logs, automated tests, versioned model deployment, and a human-in-the-loop use policy before considering external pilots.

## Configuration discrepancy
`.env.example` contains `MODEL_PATH` but current `backend/app/main.py` uses a constant file path. Do not imply the environment variable changes the loaded checkpoint without a code change. Restart backend to reload model; frontend **Refresh model** button only refetches metadata.

## Evidence and interpretation
The experiment classifies the **source-recorded `irrigation` column**, not independently measured agronomic water need. The source did not establish a verified field-level irrigation prescription. The held-out 100% score is a *within-source, post-purge observation*, not prospective performance, robustness, or external validation. Exact sensor-signature de-duplication does not establish independent farms or remove near-duplicates. Probability calibration is untested.

## Evidence files
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — setup, features, split, model selection, hashes and limitations.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — test metrics and confusion matrix.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — exact-signature overlap.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — counts and time periods.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — validation-only selection.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — unresolved source licensing.
