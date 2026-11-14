# Reproducibility — IrrigationNeed

## Exact notebook and environment
The executable record is [`notebooks/irrigationneed.ipynb`](../../notebooks/irrigationneed.ipynb) (30 cells, original Kaggle outputs). Kaggle source mount: `/kaggle/input/datasets/loliwibu/irrigationneed-dataset`; primary basename `second dataset collected.xlsx`. The notebook searches for the extracted workbook or a ZIP member, checks the SHA-256, audits related input families, produces plots and split reports, trains three candidates, evaluates the selected champion, and exports a lightweight results archive without distributing raw split rows.

**Recorded Kaggle versions:** Python 3.13.16, pandas 2.3.3, sklearn 1.6.1; seed 42. `backend/requirements.txt` uses compatible *ranges*, not a locked recreation of the training environment. To reproduce the reported experiment, preserve the notebook and record exact dependency versions (including numpy, openpyxl and joblib), source revision, and data rights.

## Reproduction steps
1. Mount the identical source workbook and supporting dataset structure in Kaggle. Verify file SHA-256 `f776f34fc9c7be1eef59614dc41ddeadef6fde9dc11d908c4ec8a513d6af4d2d`.
2. Execute notebook in order from a clean kernel (CPU is sufficient); do not resplit by random seed.
3. Confirm train/val/test counts 2,511/379/517, `purged_validation=159`, `purged_test=22`, zero exact-signature overlap.
4. Confirm validation CSV and one-time test JSON. Do not adjust model after reading test results.
5. Compare exported `irrigation_champion.joblib` to manifest checksum `835ce8cfa81402276f0795197a5eff4fab064383b583a342cff91c9b01d80593` and store artifacts with versioned provenance.

Local Windows API inference uses the **already exported** trusted joblib and does not retrain. Python and sklearn version differences may cause joblib compatibility problems.

## Evidence and interpretation
The experiment classifies the **source-recorded `irrigation` column**, not independently measured agronomic water need. The source did not establish a verified field-level irrigation prescription. The held-out 100% score is a *within-source, post-purge observation*, not prospective performance, robustness, or external validation. Exact sensor-signature de-duplication does not establish independent farms or remove near-duplicates. Probability calibration is untested.

## Evidence files
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — setup, features, split, model selection, hashes and limitations.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — test metrics and confusion matrix.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — exact-signature overlap.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — counts and time periods.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — validation-only selection.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — unresolved source licensing.
