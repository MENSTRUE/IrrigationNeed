# Notebooks — experiment execution and lineage

[`irrigationneed.ipynb`](irrigationneed.ipynb) is the source research artifact (30 cells, with saved Kaggle outputs). It reads Kaggle mount `/kaggle/input/datasets/loliwibu/irrigationneed-dataset`, searches for `second dataset collected.xlsx` in extracted files or ZIPs, hashes the primary workbook, audits supporting inputs, runs descriptive EDA, creates chronological partitions, selects model on validation and reports the held-out test once.

## Reproduction checklist
1. Verify source workbook SHA-256 `f776f34fc9c7be1eef59614dc41ddeadef6fde9dc11d908c4ec8a513d6af4d2d` and consult rights; raw data is not committed.
2. Use fresh Kaggle kernel; recorded environment Python 3.13.16 / pandas 2.3.3 / sklearn 1.6.1 / seed 42. CPU sufficient; openpyxl and joblib required.
3. Run **all cells in order**. Original 3,589 rows include 3,588 labeled; only the primary workbook drives the classifier.
4. Audit features (`crop type`, `Temperature`, `Humidity`, `Soil Moisture`, `Soil Tempertuer`), time parsing, exclusion of `Time` and `best time` from model predictors.
5. Confirm chronological retained splits 2,511/379/517, exact-signature purge 159 validation and 22 test, and no exact overlaps across splits.
6. Confirm validation model comparison, select Random Forest based on macro-F1, perform one held-out test, and compare JSON metrics + artifact checksum.

## Outputs and restrictions
The results archive includes aggregate metrics and plots; raw train/val/test CSVs generated locally by notebook are **not for redistribution** until source license is verified. A 100% score does not establish a field-validated prediction task. For discussion see [experiments](../docs/en/experiments.md), [provenance](../docs/en/dataset_provenance.md), [evaluation](../docs/en/evaluation.md). Do not rewrite notebook or experiment outputs as part of documentation maintenance.
