## File: apps/meteor/client/views/room/composer/hooks/useMessageComposerIsReadOnly.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { usePermission, useUser } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';

export const useMessageComposerIsReadOnly = (room: IRoom): boolean => {
    /* Implementation Hidden */
};

```