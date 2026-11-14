# IrrigationNeed — Full Stack Integration

Merge the `backend/`, `frontend/`, and `scripts/` directories into the existing Day 36 repository. **Do not replace** the existing `models/`, `notebooks/`, `reports/`, or root documentation.

## Backend (PowerShell terminal 1)
```powershell
cd 'D:\porto\100 day\day 36'
& 'C:\DevEnvs\ai-general\Scripts\python.exe' -m pip install -r backend\requirements.txt
& 'C:\DevEnvs\ai-general\Scripts\python.exe' -m uvicorn backend.app.main:app --reload --port 8000
```
Visit http://127.0.0.1:8000/docs and http://127.0.0.1:8000/api/v1/model

## Frontend (PowerShell terminal 2)
```powershell
cd 'D:\porto\100 day\day 36\frontend'
npm install
npm run dev
```
Visit http://127.0.0.1:5173

## Critical inference schema note
The saved model is not included in this ZIP. It is read from `models/irrigation_champion.joblib` in your existing repository. Only load your own trusted model artifacts, because joblib deserialization can execute code.

If `/api/v1/model` says `ready:false`, inspect your model with `python scripts/inspect_model.py`. If the model lacks `feature_names_in_`, create `models/inference_schema.json` from the **actual training columns**. Example shape (replace names with actual model inputs, never guess):
```json
{
  "features": ["ACTUAL_TRAINING_FEATURE_1", "ACTUAL_TRAINING_FEATURE_2"],
  "fields": {
    "ACTUAL_TRAINING_FEATURE_1": {"type": "number", "min": 0},
    "ACTUAL_TRAINING_FEATURE_2": {"type": "category", "options": ["ACTUAL_TRAINING_CATEGORY_A"]}
  },
  "prediction_labels": {"0": "Class 0", "1": "Class 1"}
}
```
Never claim irrigation volume, time, or agronomic prescriptions from a classifier unless the model was actually trained to predict those quantities. Model outputs are displayed as saved labels.

## Tests
- GET `/api/v1/health`
- GET `/api/v1/model`
- POST `/api/v1/predict` with exactly the listed features

The backend intentionally returns HTTP 503 when the model or required feature schema is not ready. A loaded model may still fail inference if the input preprocessing differs from training. Inspect the pipeline and update the schema accordingly.
