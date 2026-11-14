# Models — source-recorded irrigation classifier

## Registered artifact
`irrigation_champion.joblib` is a tracked sklearn Pipeline (median imputer, Random Forest). The experiment manifest identifies the champion as Random Forest (300 trees, min leaf 3, balanced subsampling, seed 42). Recorded expected SHA-256: `835ce8cfa81402276f0795197a5eff4fab064383b583a342cff91c9b01d80593`. Verify the **local file** with:

```powershell
Get-FileHash .\models\irrigation_champion.joblib -Algorithm SHA256
```

The manifest hash is recorded experiment evidence; it has not been recomputed in this documentation package. The trained pipeline was selected on validation macro-F1 and exported without refit on validation or test. Reported source-specific held-out test macro-F1 1.0 (n=517), **not externally validated**. See [model card](../docs/en/model_card.md).

## Inference contract
Exact five features: `crop type`, `Temperature`, `Humidity`, `Soil Moisture`, `Soil Tempertuer`. The target `irrigation` is a recorded source state: `0` no-irrigation, `1` irrigation; physical units and crop-code identities unverified. API can return probabilities, but calibration was not assessed. Optional `inference_schema.json` is **not present** in the audited repo; use only if based on verified training metadata. Current backend does not honor `.env` `MODEL_PATH`.

## Security and reproducibility
Joblib/pickle may execute arbitrary code when deserialized. Never load unknown checkpoints. Preserve file and SHA evidence; use the same sklearn-compatible environment and compare manifest lineage before reuse. There is no model registry, ONNX export or distributed serving in this repo. Training and selection details are in [methodology](../docs/en/methodology.md), [experiments](../docs/en/experiments.md), and [evaluation](../docs/en/evaluation.md).
