## File: apps/meteor/client/views/room/composer/messageBox/hooks/useMediaPermissions.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type MediaDevices = 'camera' | 'microphone';

const getDeviceKind = (name: MediaDevices): MediaDeviceKind => {
    /* Implementation Hidden */
};

export const useMediaPermissions = (name: MediaDevices): [isPermissionDenied: boolean, setIsPermissionDenied: (state: boolean) => void] => {
    /* Implementation Hidden */
};

```