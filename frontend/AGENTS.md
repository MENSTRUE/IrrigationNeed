# Frontend AGENTS.md

Follow [root AGENTS.md](../AGENTS.md), then inspect `src/App.tsx`, `src/style.css`, `package.json`, and `vite.config.ts` before editing. Preserve React 19/TypeScript/Vite stack, blue-gray visual identity, dynamic form derived from `/api/v1/model`, and explicit loading/error/result states. Avoid introducing a router without a real need; current navigation is local tab/scroll state.

Never present `predict_proba` as calibrated certainty or source-recorded labels as validated crop-water need. Do not guess crop names or sensor units, alter response contracts, store raw assessments without a privacy design, or implement actuator controls. Refresh button only reloads metadata. Maintain keyboard focus, form labels, responsiveness; add mobile navigation rather than pretending hidden desktop sidebar is accessible.

Run `npm ci`/`npm run build` for functional changes, test model unavailable and 422/500 responses, review network security, update EN and ID docs together, and inspect Git diff. Do not claim frontend e2e tests exist until implemented.
