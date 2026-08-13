## File: apps/meteor/client/hooks/roomActions/useThreadRoomAction.tsx

```typescript
import type { BadgeProps } from '@rocket.chat/fuselage';
import { HeaderToolbarAction, HeaderToolbarActionBadge } from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoomSubscription } from '../../views/room/contexts/RoomContext';

const getVariant = (tunreadUser: number, tunreadGroup: number): BadgeProps['variant'] => {
    /* Implementation Hidden */
};

const Threads = lazy(() => import('../../views/room/contextualBar/Threads'));

export const useThreadRoomAction = () => {
    /* Implementation Hidden */
};

```