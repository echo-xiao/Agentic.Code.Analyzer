## File: apps/meteor/client/views/teams/contextualBar/channels/hooks/useRemoveRoomFromTeam.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, usePermission, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';

export const useRemoveRoomFromTeam = (room: IRoom, { reload }: { reload?: () => void }) => {
    /* Implementation Hidden */
};

```