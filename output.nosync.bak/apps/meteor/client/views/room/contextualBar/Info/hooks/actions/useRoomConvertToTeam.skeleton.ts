## File: apps/meteor/client/views/room/contextualBar/Info/hooks/actions/useRoomConvertToTeam.tsx

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { IRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useTranslation, useEndpoint, usePermission } from '@rocket.chat/ui-contexts';

import { useCanEditRoom } from '../useCanEditRoom';

export const useRoomConvertToTeam = (room: IRoom) => {
    /* Implementation Hidden */
};

```