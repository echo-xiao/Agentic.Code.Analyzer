## File: apps/meteor/client/views/room/contextualBar/Info/hooks/actions/useRoomMoveToTeam.tsx

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { IRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useSetModal, useToastMessageDispatch, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';

import ChannelToTeamModal from '../../ChannelToTeamModal';
import { useCanEditRoom } from '../useCanEditRoom';

export const useRoomMoveToTeam = (room: IRoom) => {
    /* Implementation Hidden */
};

```