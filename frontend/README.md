# Frontend — React / TypeScript / IrrigationNeed

The implemented interface is a **single-page local research dashboard**, not a deployed farming product. [`src/App.tsx`](src/App.tsx) owns state and request handling; [`src/style.css`](src/style.css) implements the blue-gray responsive layout. React 19, TypeScript, Vite 6 and lucide-react are declared in [`package.json`](package.json). Vite's [`vite.config.ts`](vite.config.ts) proxies `/api` to `http://127.0.0.1:8000`.

## UI flow
1. `useEffect` requests `GET /api/v1/model` on page load, showing readiness and discovered model features.
2. Metadata drives required number/category controls. Current saved model exposes **five numeric fields**. Without an explicit schema, crop type is still a numeric code; do not label it as a named crop.
3. User inputs values and submits via `POST /api/v1/predict`. Form state is converted to numeric for fields marked `number`; errors are displayed in a notice rather than masked.
4. Results show raw/optional display label and per-class `predict_proba` bars. **These are not calibrated irrigation-need probabilities.**
5. Overview/Prediction/Model Insights buttons update client view or scroll to work area; no independent multipage router is implemented. “Refresh model” refetches metadata, not server-side joblib file.

## Local run and build
```powershell
cd 'D:\porto\100 day\day 36\frontend'
npm ci
npm run dev
npm run build
```
Access `http://127.0.0.1:5173`, after FastAPI port 8000 is running. `npm run build` executes `tsc -b && vite build`; there is no test script in the audited `package.json`.

## Usability and gaps
Responsive layout collapses to single-column content on narrower viewports; sidebar is hidden on mobile, and no alternative mobile navigation is implemented. There is no authentication, user profile, assessment history persistence, localization switch, live sensor feed, accessibility audit, or farm decision workflow. Model output classes remain 0/1 until verified labels are added to inference metadata. API access failure is shown rather than replaced with mock predictions.

## Safety, testing and maintenance
Do not infer physical sensor units or tell users when to turn pumps on. Verify network responses in DevTools and check errors in Uvicorn. For changes run `npm run build`, inspect an empty/unavailable model state, a valid five-feature prediction and invalid/timeout behavior, and synchronize [architecture](../docs/en/architecture.md) and [limitations](../docs/en/limitations.md). An actual local screenshot is available under [`assets/screenshots`](../assets/screenshots/Screenshot%202026-11-14%20195402.png).
