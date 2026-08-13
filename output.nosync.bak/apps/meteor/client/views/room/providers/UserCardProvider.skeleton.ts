## File: apps/meteor/client/views/room/providers/UserCardProvider.tsx

```typescript
import { useOverlayTrigger } from '@react-aria/overlays';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { Popover } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRoomToolbox, UserCardContext } from '@rocket.chat/ui-contexts';
import type { ComponentProps, ReactNode, UIEvent } from 'react';
import { Suspense, lazy, useCallback, useMemo, useRef, useState } from 'react';

import { useRoom } from '../contexts/RoomContext';

const UserCard = lazy(() => import('../UserCard'));

const UserCardProvider = ({ children }: { children: ReactNode }) => {
    /* Implementation Hidden */
};

export default UserCardProvider;

```