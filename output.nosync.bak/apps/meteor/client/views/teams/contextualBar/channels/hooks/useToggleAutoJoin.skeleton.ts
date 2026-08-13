## File: apps/meteor/client/views/teams/contextualBar/channels/hooks/useToggleAutoJoin.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useEndpoint, usePermission, useSetting, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { t } from 'i18next';

import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';

export const useToggleAutoJoin = (room: IRoom, { reload, mainRoom }: { reload?: () => void; mainRoom: IRoom }) => {
    /* Implementation Hidden */
};

```