# SoloHQ Release Status

## 0.2.4 — 2026-08-26

- Source revision: Git tag `v0.2.4`.
- Change: fixed the Google quick-app settings panel so it uses the active SoloHQ theme; Midnight Dark no longer renders it with a white background.
- Immutable build artifact: `releases/SoloHQ-20260826-2049-midnight-quick-app-panel.tar.gz`.
- SHA-256: `ee6c5f12a7bf7e4c9de105022fe270acf0aa8f80bfb276eb44087ab947eb7a20`.
- Validation: `npm test`, `npm run build`, `npm run lint`, and archive layout inspection all passed.
- Deployment target: `https://solohq.agentsbin.com/solohq/home/` (with the `www.agentsbin.com` SoloHQ routes redirected to this canonical domain).
- Rollback: Git tag `v0.2.3` / AgentsBin site release commit `b98e1b3`.
