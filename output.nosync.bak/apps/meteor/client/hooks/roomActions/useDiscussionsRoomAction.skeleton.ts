## File: apps/meteor/client/hooks/roomActions/useDiscussionsRoomAction.ts

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import { useSetting } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoom } from '../../views/room/contexts/RoomContext';

const Discussions = lazy(() => import('../../views/room/contextualBar/Discussions'));

export const useDiscussionsRoomAction = () => {
    /* Implementation Hidden */
};

```