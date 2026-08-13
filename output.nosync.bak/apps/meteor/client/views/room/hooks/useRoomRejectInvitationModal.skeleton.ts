## File: apps/meteor/client/views/room/hooks/useRoomRejectInvitationModal.tsx

```typescript
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useUserSubscription } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoomName } from '../../../hooks/useRoomName';
import type { IRoomWithFederationOriginalName } from '../contexts/RoomContext';

type RoomRejectInvitationModalResult = {
	open: () => Promise<boolean>;
	close: () => void;
};

export const useRoomRejectInvitationModal = (room: IRoomWithFederationOriginalName): RoomRejectInvitationModalResult => {
    /* Implementation Hidden */
};

```