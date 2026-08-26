# SoloHQ Release Status

## 0.2.5 — 2026-08-26

- Source revision: Git tag `v0.2.5`.
- Change: added date-stamped workspace notes, a date index, and collapsible pinned-note summaries; corrected the note-panel drag-handle alignment.
- Immutable build artifact: `releases/SoloHQ-20260826-2303-dated-notes-and-pins.tar.gz`.
- SHA-256: `582c11b95cb0c83f0ce9ad4b77ba90f297f322ec732ed5de7ab6f16d683c5702`.
- Validation: `npm test` (7 tests), `npm run build`, `npm run lint`, and archive layout inspection all passed.
- Deployment target: `https://solohq.agentsbin.com/solohq/home/` (with the `www.agentsbin.com` SoloHQ routes redirected to this canonical domain).
- Rollback: Git tag `v0.2.4` / AgentsBin site release commit `3afeda5`.

## 0.2.4 — 2026-08-26

- Source revision: Git tag `v0.2.4`.
- Change: fixed the Google quick-app settings panel so it uses the active SoloHQ theme; Midnight Dark no longer renders it with a white background.
- Immutable build artifact: `releases/SoloHQ-20260826-2049-midnight-quick-app-panel.tar.gz`.
- SHA-256: `ee6c5f12a7bf7e4c9de105022fe270acf0aa8f80bfb276eb44087ab947eb7a20`.
- Validation: `npm test`, `npm run build`, `npm run lint`, and archive layout inspection all passed.
- Deployment target: `https://solohq.agentsbin.com/solohq/home/` (with the `www.agentsbin.com` SoloHQ routes redirected to this canonical domain).
- Rollback: Git tag `v0.2.3` / AgentsBin site release commit `b98e1b3`.
