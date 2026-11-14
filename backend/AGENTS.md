# Backend AGENTS.md

Follow the [root agent policy](../AGENTS.md). The source of truth is `backend/app/main.py` and the original experiment artifacts. Preserve `GET /api/v1/health`, `GET /api/v1/model`, and `POST /api/v1/predict` response contracts. Keep exact five input names including source typo `Soil Tempertuer`; don't assume units or convert crop codes without verified metadata.

## Security and QA
Never unpickle arbitrary uploads. Load only the trusted local `irrigation_champion.joblib`; do not silently change its checksum or train a new model. Reject unknown/missing keys, booleans, NaN/Infinity and invalid schema values with appropriate 422/503/500 codes. CORS local development origins are not production security. Do not introduce pump actuation. Document model-loading failure and local restart semantics. Add pytest coverage before claiming CI-tested backend. Preserve code during documentation-only tasks.

## Done criteria
Record changed endpoint behavior, run a FastAPI smoke test in a safe local environment, check input/output schema backward compatibility, verify model provenance, update EN/ID architecture and deployment docs, review diff for secrets and unapproved artifact changes.
