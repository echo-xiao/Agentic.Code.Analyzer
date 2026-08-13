## File: apps/meteor/client/hooks/roomActions/useGameCenterRoomAction.ts

```typescript
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';

import { useExternalComponentsQuery } from '../../apps/gameCenter/hooks/useExternalComponentsQuery';

const GameCenter = lazy(() => import('../../apps/gameCenter/GameCenter'));

export const useGameCenterRoomAction = () => {
    /* Implementation Hidden */
};

```