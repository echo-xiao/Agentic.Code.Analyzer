## File: apps/meteor/client/sidebar/Item/useDeferredMenuMount.ts

```typescript
import { useCallback, useEffect, useRef, useState } from 'react';

type IdleHandle = { type: 'idle' | 'timeout'; id: number };

const schedule = (fn: () => void): IdleHandle => {
    /* Implementation Hidden */
};

const cancel = (handle: IdleHandle) => {
    /* Implementation Hidden */
};

/**
 * Defers mounting the sidebar item's RoomMenu until the browser is idle. The menu's hooks
 * (useUserSubscription, usePermission, useSetting, useOmnichannelPrioritiesMenu, useUserPresence)
 * are not cheap to run synchronously inside the same pointerover/click task as a room navigation,
 * so we let the browser finish more urgent work first.
 */
export const useDeferredMenuMount = () => {
    /* Implementation Hidden */
};

```