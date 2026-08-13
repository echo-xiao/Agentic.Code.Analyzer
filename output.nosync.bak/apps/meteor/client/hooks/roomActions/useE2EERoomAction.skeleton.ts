## File: apps/meteor/client/hooks/roomActions/useE2EERoomAction.ts

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { imperativeModal } from '@rocket.chat/ui-client';
import { useSetting, usePermission, useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getRoomTypeTranslation } from '../../lib/getRoomTypeTranslation';
import { useRoom, useRoomSubscription } from '../../views/room/contexts/RoomContext';
import { useE2EERoomState } from '../../views/room/hooks/useE2EERoomState';
import { useE2EEState } from '../../views/room/hooks/useE2EEState';
import BaseDisableE2EEModal from '../../views/room/modals/E2EEModals/BaseDisableE2EEModal';
import EnableE2EEModal from '../../views/room/modals/E2EEModals/EnableE2EEModal';

export const useE2EERoomAction = () => {
    /* Implementation Hidden */
};

```