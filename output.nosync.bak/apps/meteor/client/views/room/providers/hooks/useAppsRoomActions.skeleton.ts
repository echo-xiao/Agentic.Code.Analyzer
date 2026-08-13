## File: apps/meteor/client/views/room/providers/hooks/useAppsRoomActions.ts

```typescript
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { UiKitTriggerTimeoutError } from '../../../../../app/ui-message/client/UiKitTriggerTimeoutError';
import { Utilities } from '../../../../../ee/lib/misc/Utilities';
import { useAppActionButtons } from '../../../../hooks/useAppActionButtons';
import { useApplyButtonFilters } from '../../../../hooks/useApplyButtonFilters';
import { useUiKitActionManager } from '../../../../uikit/hooks/useUiKitActionManager';
import { useRoom } from '../../contexts/RoomContext';

export const useAppsRoomActions = () => {
    /* Implementation Hidden */
};

```