# Scripts — model inspection and maintenance

The implemented utility [`inspect_model.py`](inspect_model.py) reads the local `models/irrigation_champion.joblib` and prints model type, `feature_names_in_`, `classes_`, and sklearn pipeline steps. It does **not** train, evaluate, deploy, rewrite, or verify cryptographic hash by itself.

```powershell
cd 'D:\porto\100 day\day 36'
& 'C:\DevEnvs\ai-general\Scripts\python.exe' scripts\inspect_model.py
```

**Security:** `joblib.load()` deserializes arbitrary Python objects; only inspect checkpoints you produced or independently trust. A separate file hash command is `Get-FileHash .\models\irrigation_champion.joblib -Algorithm SHA256` in PowerShell; compare to hash in experiment manifest. Never load user-supplied pickles through an API.

There are no source scripts for dataset download or retraining in this folder; the executable training workflow is the [notebook](../notebooks/irrigationneed.ipynb). If future scripts are added, document inputs, outputs, safety, supported OS, invocation, deterministic behavior and rollback. See [reproducibility](../docs/en/reproducibility.md).
