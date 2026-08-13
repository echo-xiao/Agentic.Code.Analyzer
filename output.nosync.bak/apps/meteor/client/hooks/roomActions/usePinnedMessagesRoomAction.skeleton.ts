## File: apps/meteor/client/hooks/roomActions/usePinnedMessagesRoomAction.ts

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import { useSetting } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoom } from '../../views/room/contexts/RoomContext';

const PinnedMessagesTab = lazy(() => import('../../views/room/contextualBar/PinnedMessagesTab'));

export const usePinnedMessagesRoomAction = () => {
    /* Implementation Hidden */
};

```