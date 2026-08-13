## File: apps/meteor/client/hooks/roomActions/useAppsRoomStarActions.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { GenericMenu, HeaderToolbarAction } from '@rocket.chat/ui-client';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { UiKitTriggerTimeoutError } from '../../../app/ui-message/client/UiKitTriggerTimeoutError';
import { Utilities } from '../../../ee/lib/misc/Utilities';
import { useUiKitActionManager } from '../../uikit/hooks/useUiKitActionManager';
import { useRoom } from '../../views/room/contexts/RoomContext';
import { useAppActionButtons } from '../useAppActionButtons';
import { useApplyButtonFilters } from '../useApplyButtonFilters';

export const useAppsRoomStarActions = () => {
    /* Implementation Hidden */
};

```