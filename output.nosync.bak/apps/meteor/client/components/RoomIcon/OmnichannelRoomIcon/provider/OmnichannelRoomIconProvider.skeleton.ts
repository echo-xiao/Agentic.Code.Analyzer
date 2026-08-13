## File: apps/meteor/client/components/RoomIcon/OmnichannelRoomIcon/provider/OmnichannelRoomIconProvider.tsx

```typescript
import DOMPurify from 'dompurify';
import type { ReactNode } from 'react';
import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { OmnichannelRoomIconContext } from '../context/OmnichannelRoomIconContext';
import OmnichannelRoomIconManager from '../lib/OmnichannelRoomIconManager';

let icons = Array.from(OmnichannelRoomIconManager.icons.values());

export type OmnichannelRoomIconProviderProps = {
	children?: ReactNode;
};

export const OmnichannelRoomIconProvider = ({ children }: OmnichannelRoomIconProviderProps) => {
    /* Implementation Hidden */
};

```