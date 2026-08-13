## File: apps/meteor/client/views/root/hooks/useDesktopUserRoles.ts

```typescript
import { useUser } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

/**
 * Pushes the logged-in user's roles to the desktop app so it can decide which
 * supportedVersions messages to show (e.g. restricting version-expiration
 * warnings to admins). The desktop app falls back to its own role lookup when
 * this bridge is unavailable, so `setUserRoles` is called optionally.
 */
export const useDesktopUserRoles = () => {
    /* Implementation Hidden */
};

```