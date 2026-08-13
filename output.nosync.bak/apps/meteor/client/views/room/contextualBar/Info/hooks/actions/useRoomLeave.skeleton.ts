## File: apps/meteor/client/views/room/contextualBar/Info/hooks/actions/useRoomLeave.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useRouter, useSetModal, useToastMessageDispatch, useEndpoint, usePermission, useUserSubscription } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { LegacyRoomManager } from '../../../../../../../app/ui-utils/client';
import { UiTextContext } from '../../../../../../../definition/IRoomTypeConfig';
import WarningModal from '../../../../../../components/WarningModal';
import { roomCoordinator } from '../../../../../../lib/rooms/roomCoordinator';

export const useRoomLeave = (room: IRoom) => {
    /* Implementation Hidden */
};

```