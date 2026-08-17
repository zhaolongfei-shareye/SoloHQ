# Chrome Web Store submission

## Package

Run the following command from the repository root:

```bash
npm run extension:zip
```

Upload `SoloHQ-extension.zip` to the Chrome Web Store Developer Dashboard. The archive contains only the production React build and the Manifest V3 file. It requests no browser permissions; its sole browser integration is replacing the new tab page.

## Store listing

**Name**

SoloHQ New Tab

**Summary**

Local-first dashboard for solo founders. Projects, notes, bookmarks, search, and revenue in every new tab.

**Description**

SoloHQ turns your new tab into a private workspace for running a one-person company. Organize projects and milestones, keep workspace notes, open favorite links, search the web, and track MRR.

Your data stays in your browser. SoloHQ has no account, no backend, no analytics, and no browser permissions. Export a JSON backup whenever you want to move your data.

**Category**

Productivity

## Privacy disclosures

- The extension does not collect, transmit, or sell user data.
- Project data, notes, bookmarks, preferences, and revenue data are stored in the browser's local storage.
- Data is only included in a JSON file when the user explicitly exports a backup.
- The extension does not use remote code.

## Screenshots and icon

Use `docs/screenshot.png` for the primary store screenshot. Before publishing, create a 128 by 128 PNG icon from the SoloHQ mark in `public/favicon.svg`, and add it to the store listing and `manifest.json`.

## Functional test

1. Run `npm run extension:build`.
2. In Chrome, open `chrome://extensions` and enable Developer mode.
3. Choose **Load unpacked** and select the generated `dist` folder.
4. Open a new tab and confirm that SoloHQ is shown.
5. Create a project, change a theme, and open another new tab to confirm local persistence.
