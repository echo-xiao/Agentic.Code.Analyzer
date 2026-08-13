## File: apps/meteor/client/components/RoomIcon/OmnichannelRoomIcon/context/OmnichannelRoomIconContext.tsx

```typescript
import { createContext, useMemo, useContext, useSyncExternalStore } from 'react';

type IOmnichannelRoomIconContext = {
	queryIcon(app: string, icon: string): [subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => string | undefined];
};

export const OmnichannelRoomIconContext = createContext<IOmnichannelRoomIconContext>({
	queryIcon: () => [(): (() => void) => (): void => undefined, () => undefined],
});

export const useOmnichannelRoomIcon = (app: string, icon: string): string | undefined => {
    /* Implementation Hidden */
};

```