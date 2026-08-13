## File: apps/meteor/client/hooks/roomActions/useMediaCallRoomAction.ts

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import { useUserAvatarPath, useUserId } from '@rocket.chat/ui-contexts';
import type { TranslationKey, RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import type { PeerInfo } from '@rocket.chat/ui-voip';
import { useMediaCallAction } from '@rocket.chat/ui-voip';
import { useMemo } from 'react';

import { useRoom, useRoomSubscription } from '../../views/room/contexts/RoomContext';
import { useUserInfoQuery } from '../useUserInfoQuery';

const getPeerId = (uids: string[], ownUserId: string | undefined) => {
    /* Implementation Hidden */
};

export const useMediaCallRoomAction = () => {
    /* Implementation Hidden */
};

```