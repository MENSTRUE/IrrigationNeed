# Backend — FastAPI / IrrigationNeed

The implemented API lives in [`app/main.py`](app/main.py), with dependencies in [`requirements.txt`](requirements.txt). It serves a trusted local sklearn Pipeline and emits binary source-label predictions. **It is not an irrigation pump controller or validated field advisory service.**

## Stack and lifecycle
FastAPI, Pydantic 2, pandas, NumPy, joblib, scikit-learn, Uvicorn. At application startup the `load_model()` function loads `../models/irrigation_champion.joblib`, reads optional `../models/inference_schema.json`, infers feature names from sklearn `feature_names_in_`, builds numeric input specifications, and sets readiness state. A missing model or invalid schema makes inference unavailable; it does not synthesize results.

## Endpoints and schemas
| Method | Route | Contract |
|---|---|---|
| GET | `/api/v1/health` | `status`, `model_status`, `model_ready` |
| GET | `/api/v1/model` | readiness, failure reason, model basename, field definitions, label mapping, disclaimer |
| POST | `/api/v1/predict` | `{"features": {EXACT_FEATURE_NAME: numeric_value, ...}}`; result has `prediction`, `display_label`, `model`, optional `class_probabilities` |

Exact keys: `crop type`, `Temperature`, `Humidity`, `Soil Moisture`, `Soil Tempertuer`. Inputs are coerced to finite float; booleans are rejected; any missing or extra feature returns HTTP 422. `min` and `max` apply only if configured in schema. Missing/invalid category options are rejected if a feature is explicitly marked categorical. Unready model → 503; inference exception → 500 with server-side logged traceback.

```powershell
# From repository root; adjust Python executable to your trusted environment
& 'C:\DevEnvs\ai-general\Scripts\python.exe' -m pip install -r backend\requirements.txt
& 'C:\DevEnvs\ai-general\Scripts\python.exe' -m uvicorn backend.app.main:app --reload --port 8000
```

Swagger: `http://127.0.0.1:8000/docs`. Example PowerShell smoke check:
```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/v1/health
Invoke-RestMethod http://127.0.0.1:8000/api/v1/model
```

## Model loading and risks
Joblib uses pickle semantics: **only load a trusted artifact**. The experiment manifest records a model SHA-256, but the current service does not enforce it automatically. The code uses a constant `MODEL_PATH` (it does not read `MODEL_PATH` from `.env`). Restart backend after replacing model; frontend refresh only re-fetches metadata. Numerical labels remain `0`/`1` until an evidence-based inference schema maps them.

## Security and testing
Development CORS origins are limited to Vite localhost/127.0.0.1 port 5173. There is no auth, rate limiting, request logging database or public deployment configuration. Do not expose production traffic. No automated backend tests are committed; recommended cases: health/model readiness, exact feature keys, NaN/infinite rejection, missing model 503, prediction shape, label mapping, and model checksum verification. See [architecture](../docs/en/architecture.md) and [troubleshooting](../docs/en/troubleshooting.md).
