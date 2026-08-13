## File: apps/meteor/client/hooks/roomActions/useCleanHistoryRoomAction.ts

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import { usePermission } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoom } from '../../views/room/contexts/RoomContext';

const PruneMessages = lazy(() => import('../../views/room/contextualBar/PruneMessages'));

export const useCleanHistoryRoomAction = () => {
    /* Implementation Hidden */
};

```