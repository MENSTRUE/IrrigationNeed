# Reports — experiment evidence index

This directory contains machine-generated aggregate evidence under `extracted/`, a local `extraction_manifest.json` and an original results ZIP held locally (ZIP ignored by Git). All report contents must be interpreted with the source-target limitations; never fabricate missing supporting data.

| File | What it supports |
|---|---|
| [`experiment_manifest.json`](extracted/experiment_manifest.json) | Primary data, model features, seed, split, selection, hashes, limitations |
| [`heldout_test_metrics.json`](extracted/heldout_test_metrics.json) | 517-row within-source test and confusion matrix |
| [`validation_model_comparison.csv`](extracted/validation_model_comparison.csv) | Dummy/LogReg/RF validation comparison |
| [`split_audit.csv`](extracted/split_audit.csv) | Final train/validation/test distribution and time windows |
| [`leakage_audit.json`](extracted/leakage_audit.json) | Zero exact signature overlap after purge, not proof of independence |
| [`heldout_error_counts.csv`](extracted/heldout_error_counts.csv) | 517 correct within retained test |
| [`dataset_provenance_pending_verification.json`](extracted/dataset_provenance_pending_verification.json) | Original source and license pending verification |
| [`input_file_inventory.csv`](extracted/input_file_inventory.csv) | Inventory of mounted supporting source files |
| [`auxiliary_csv_schema_inventory.csv`](extracted/auxiliary_csv_schema_inventory.csv) | Headers of supporting CSV sources; NOT mixed into training |
| [`extraction_manifest.json`](extraction_manifest.json) | Local ZIP extraction mapping |

## Interpreting results
The Random Forest validation macro-F1 and held-out test macro-F1 are both **1.0** according to saved reports. Class imbalance changes sharply across time, and neither farm/site independence nor field-target validity is established. See [evaluation](../docs/en/evaluation.md) and [limitations](../docs/en/limitations.md). **Do not** treat plots alone or an app screenshot as scientific verification.

## Evidence handling
Keep original JSON/CSV content unchanged. When updating docs, use file-linked numbers; if rerunning experiment, store new versioned results and compare before revising claims. The source data and rights are external; never commit raw records. See [provenance](../docs/en/dataset_provenance.md).
