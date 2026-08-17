# Cloud sync setup

SoloHQ keeps working without an account. Google sign-in is only used to identify a private workspace that can be shared between a user's devices.

## Google Cloud Console

Use the existing AgentsBin OAuth web client and add this exact Authorized redirect URI:

```
https://www.agentsbin.com/api/solohq/auth/callback
```

The sign-in flow requests only `openid`, `email`, and `profile`. It does not request access to Gmail, Drive, Calendar, or other Google data.

## Cloud storage

The AgentsBin D1 database stores one JSON workspace per Google account. It contains SoloHQ projects, memos, bookmarks, preferences, and revenue settings. The API only reads or writes the row matching the signed-in session.

On a new device, users choose either the existing cloud workspace or the current device's local data. A revision check prevents background sync from silently overwriting a newer cloud copy. Users can delete their cloud workspace in SoloHQ Settings; that does not delete their local browser data.
