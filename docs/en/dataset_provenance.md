# Dataset Provenance — IrrigationNeed

## Primary and auxiliary datasets
The trained target comes from **`second dataset collected.xlsx`**, resolved in the notebook under the Kaggle mount `loliwibu/irrigationneed-dataset`, subdirectory `01_Irrigation_Dataset/Irrigation-Dataset/`. The recorded source SHA-256 is `f776f34fc9c7be1eef59614dc41ddeadef6fde9dc11d908c4ec8a513d6af4d2d`. The manifest lists the original publication candidate [Mendeley Data record 67gkrzbwrr/1](https://data.mendeley.com/datasets/67gkrzbwrr/1); **publisher attribution and license have not been verified**. Do not imply redistribution permission.

The mount additionally contains: Smart Irrigation Control logs, Environmental Sensor workbook, Soil Moisture/Motor CSV, and Irrigation Actuator/Weather data. They were inventoried **as auxiliary source families**, not merged into the labeled classifier. See [`input_file_inventory.csv`](../../reports/extracted/input_file_inventory.csv) and [`auxiliary_csv_schema_inventory.csv`](../../reports/extracted/auxiliary_csv_schema_inventory.csv).

## Collection and target
The original Excel contains 3,589 rows; 3,588 are labeled (`0`: 2,997; `1`: 591). The target is the source-recorded `irrigation` value. Class `0` means “no irrigation (source label)” and `1` means “irrigation (source label)” **for dataset interpretation only**. No measured water volume, scheduling optimization, soil water balance, reference evapotranspiration, or independent agronomist annotation is part of this model.

## Verification backlog
Verify publisher identity, collection site, sensor units, crop-code meanings, timestamps/time zone, licensing/attribution, source target decision policy, and whether identical features were generated through deterministic rules. Record version and access date only after checking original records. Do not redistribute any raw rows until rights are confirmed.

## Evidence and interpretation
The experiment classifies the **source-recorded `irrigation` column**, not independently measured agronomic water need. The source did not establish a verified field-level irrigation prescription. The held-out 100% score is a *within-source, post-purge observation*, not prospective performance, robustness, or external validation. Exact sensor-signature de-duplication does not establish independent farms or remove near-duplicates. Probability calibration is untested.

## Evidence files
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — setup, features, split, model selection, hashes and limitations.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — test metrics and confusion matrix.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — exact-signature overlap.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — counts and time periods.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — validation-only selection.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — unresolved source licensing.
