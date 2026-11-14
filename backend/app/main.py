"""IrrigationNeed inference API. Load only trusted local model artifacts."""
from __future__ import annotations
import json
import logging
import os
from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

LOG = logging.getLogger("irrigationneed")
ROOT = Path(__file__).resolve().parents[2]
MODEL_PATH = ROOT / "models" / "irrigation_champion.joblib"
SCHEMA_PATH = ROOT / "models" / "inference_schema.json"

app = FastAPI(title="IrrigationNeed API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], allow_methods=["GET", "POST"], allow_headers=["Content-Type"])

class PredictionRequest(BaseModel):
    features: dict[str, Any] = Field(min_length=1, max_length=100)

_model = None
_features: list[str] = []
_specs: list[dict] = []
_status = "not_loaded"
_reason = ""
_labels: dict[str, str] = {}


def _schema() -> dict:
    if not SCHEMA_PATH.exists():
        return {}
    value = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError("Schema must be a JSON object")
    return value


def load_model():
    global _model, _features, _specs, _status, _reason, _labels
    _model, _features, _specs, _labels = None, [], [], {}
    _status, _reason = "unavailable", ""
    if not MODEL_PATH.is_file():
        _reason = "Model artifact not found at models/irrigation_champion.joblib"
        return
    try:
        # IMPORTANT: joblib uses pickle; only load locally produced, trusted artifacts.
        model = joblib.load(MODEL_PATH)
        schema = _schema()
        names = schema.get("features") or getattr(model, "feature_names_in_", None)
        if names is None and hasattr(model, "named_steps"):
            for step in model.named_steps.values():
                names = getattr(step, "feature_names_in_", None)
                if names is not None:
                    break
        if names is None:
            _reason = "Model has no feature_names_in_. Create models/inference_schema.json from training input columns."
            return
        names = [str(name) for name in list(names)]
        if not names or len(names) != len(set(names)):
            raise ValueError("Feature names are empty or duplicated")
        raw_specs = schema.get("fields", {})
        if not isinstance(raw_specs, dict):
            raise ValueError("fields must be a dictionary")
        specs = []
        for name in names:
            spec = raw_specs.get(name, {})
            if not isinstance(spec, dict):
                raise ValueError(f"Invalid field configuration for {name}")
            kind = spec.get("type", "number")
            if kind not in ("number", "category"):
                raise ValueError(f"Unsupported type for {name}")
            options = spec.get("options", [])
            if kind == "category" and (not isinstance(options, list) or not options):
                raise ValueError(f"Category feature {name} needs explicit options")
            specs.append({"name": name, "label": spec.get("label", name.replace("_", " ").title()), "type": kind, "unit": spec.get("unit", ""), "options": options, "min": spec.get("min"), "max": spec.get("max"), "description": spec.get("description", "")})
        if not hasattr(model, "predict"):
            raise ValueError("Artifact has no predict method")
        _model, _features, _specs = model, names, specs
        _labels = {str(k): str(v) for k, v in schema.get("prediction_labels", {}).items()}
        _status = "ready"
    except Exception as exc:
        LOG.exception("Model initialization failed")
        _reason = f"Model initialization failed: {type(exc).__name__}: {exc}"


@app.on_event("startup")
def startup():
    load_model()


@app.get("/api/v1/health")
def health():
    return {"status": "ok", "model_status": _status, "model_ready": _status == "ready"}


@app.get("/api/v1/model")
def model_info():
    return {"ready": _status == "ready", "status": _status, "reason": _reason, "model_name": MODEL_PATH.name, "features": _specs, "prediction_labels": _labels, "disclaimer": "Model predictions are decision support, not calibrated irrigation prescriptions."}


def _validate(values: dict[str, Any]) -> pd.DataFrame:
    if set(values) != set(_features):
        missing = sorted(set(_features) - set(values))
        extra = sorted(set(values) - set(_features))
        raise HTTPException(422, detail={"missing": missing, "unexpected": extra})
    row = {}
    for spec in _specs:
        name = spec["name"]
        value = values[name]
        if spec["type"] == "number":
            if isinstance(value, bool):
                raise HTTPException(422, detail=f"{name}: boolean is not numeric")
            try:
                value = float(value)
            except (TypeError, ValueError):
                raise HTTPException(422, detail=f"{name}: must be numeric")
            if not np.isfinite(value):
                raise HTTPException(422, detail=f"{name}: must be finite")
            if spec["min"] is not None and value < spec["min"]:
                raise HTTPException(422, detail=f"{name}: below minimum")
            if spec["max"] is not None and value > spec["max"]:
                raise HTTPException(422, detail=f"{name}: above maximum")
        else:
            if not isinstance(value, str) or value not in spec["options"]:
                raise HTTPException(422, detail=f"{name}: invalid category")
        row[name] = value
    return pd.DataFrame([row], columns=_features)


@app.post("/api/v1/predict")
def predict(request: PredictionRequest):
    if _status != "ready":
        raise HTTPException(503, detail=_reason or "Model unavailable")
    frame = _validate(request.features)
    try:
        result = _model.predict(frame)
        raw = result[0]
        if hasattr(raw, "item"):
            raw = raw.item()
        if not isinstance(raw, (str, int, float, bool)):
            raw = str(raw)
        response = {"prediction": raw, "display_label": _labels.get(str(raw), str(raw)), "model": MODEL_PATH.name}
        if hasattr(_model, "predict_proba"):
            probabilities = _model.predict_proba(frame)[0]
            classes = getattr(_model, "classes_", range(len(probabilities)))
            response["class_probabilities"] = {str(cls): round(float(prob), 6) for cls, prob in zip(classes, probabilities)}
        return response
    except Exception as exc:
        LOG.exception("Prediction failed")
        raise HTTPException(500, detail=f"Model inference failed: {type(exc).__name__}. Verify inference schema and training preprocessing.")
