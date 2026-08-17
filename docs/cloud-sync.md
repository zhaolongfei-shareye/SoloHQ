# Cloud sync setup

SoloHQ keeps working without an account. Google sign-in is only used to identify a private workspace that can be shared between a user's devices.

## Google Cloud Console

Use the existing AgentsBin OAuth web client and add these exact Authorized redirect URIs:

```
https://www.agentsbin.com/api/solohq/auth/callback
https://solohq.agentsbin.com/api/solohq/auth/callback
```

The normal sign-in flow requests only `openid`, `email`, and `profile`. Google Docs sync requests the non-sensitive `https://www.googleapis.com/auth/drive.file` scope only after a signed-in user presses **Sync Google Docs**. Enable both **Google Drive API** and **Google Docs API** in the same Google Cloud project.

Google returns a refresh token so the user does not need to approve every update. SoloHQ encrypts that refresh token with the Cloudflare Pages secret `SOLOHQ_TOKEN_ENCRYPTION_KEY` before storing it in D1. Generate a random value for that secret and never rotate it without arranging a user reconnect flow.

## Google Docs project notes

The first successful project sync creates a `SoloHQ` folder in the user's Google Drive. It creates a document titled with the project name, stores the document ID, and writes the Google Docs URL to that project's `Google Docs` integration. Later syncs update the stored document rather than making duplicates; if the project name changes, the document title is updated too.

Users must press the Google Docs sync control themselves before SoloHQ requests Drive access. Sync replaces the generated document content with the current SoloHQ project data, memo, and project links.

## Cloud storage

The AgentsBin D1 database stores one JSON workspace per Google account. It contains SoloHQ projects, memos, bookmarks, preferences, and revenue settings. The API only reads or writes the row matching the signed-in session.

On a new device, users choose either the existing cloud workspace or the current device's local data. A revision check prevents background sync from silently overwriting a newer cloud copy. Users can delete their cloud workspace in SoloHQ Settings; that does not delete their local browser data.
