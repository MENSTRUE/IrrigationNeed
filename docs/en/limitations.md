# Limitations — IrrigationNeed

## Scientific limitations
1. **Target validity:** 0/1 represent source-recorded states; crop-water necessity is not independently assessed. Physical units and crop-code mapping unverified.
2. **Perfect metrics:** 100% validation and test could arise from simple/derived labels, temporal continuity or related samples. Exact overlap zero does not disprove these possibilities.
3. **Distribution shift:** positive rate 4.90% train, 55.67% validation, 44.87% test; no farm-separated or independent external evaluation.
4. **Model probability:** probability calibration, threshold behavior and operational risk trade-offs were not tested.
5. **Data governance:** original license and attribution terms are pending; no raw-data redistribution.

## Engineering limitations
The frontend displays numeric classes unless explicit label schema exists. Unit/range restrictions are absent unless configured through `models/inference_schema.json`. Backend does not read `MODEL_PATH` from `.env`; UI refresh does not reload model. No auth/rate limiting/production observability, persistent prediction logs, field-device integration, or automated test suite is in the audited repository.

## Claim boundaries and risk controls
Use language such as “records classifier” and “research prototype”. Avoid “water-efficient”, “farmer validated”, “99% accurate in the field”, “calibrated confidence”, “automatic irrigation”, and “production ready”. An irrigation mistake could damage crops or waste water. Treat every prediction as informational only. Future acceptance gates: source semantics verified; time- and farm-separated external dataset; reproducible evaluation with error bars; calibration study; domain expert sign-off; safe operations testing.

## Evidence and interpretation
The experiment classifies the **source-recorded `irrigation` column**, not independently measured agronomic water need. The source did not establish a verified field-level irrigation prescription. The held-out 100% score is a *within-source, post-purge observation*, not prospective performance, robustness, or external validation. Exact sensor-signature de-duplication does not establish independent farms or remove near-duplicates. Probability calibration is untested.

## Evidence files
- [`experiment_manifest.json`](../../reports/extracted/experiment_manifest.json) — setup, features, split, model selection, hashes and limitations.
- [`heldout_test_metrics.json`](../../reports/extracted/heldout_test_metrics.json) — test metrics and confusion matrix.
- [`leakage_audit.json`](../../reports/extracted/leakage_audit.json) — exact-signature overlap.
- [`split_audit.csv`](../../reports/extracted/split_audit.csv) — counts and time periods.
- [`validation_model_comparison.csv`](../../reports/extracted/validation_model_comparison.csv) — validation-only selection.
- [`dataset_provenance_pending_verification.json`](../../reports/extracted/dataset_provenance_pending_verification.json) — unresolved source licensing.
