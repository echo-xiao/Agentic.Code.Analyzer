## File: apps/meteor/client/hooks/roomActions/useVideoCallRoomAction.ts

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import { useStableCallback, useStableArray } from '@rocket.chat/fuselage-hooks';
import { usePermission, useSetting, useUser } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import {
	useVideoConfDispatchOutgoing,
	useVideoConfIsCalling,
	useVideoConfIsRinging,
	useVideoConfLoadCapabilities,
} from '@rocket.chat/ui-video-conf';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoom } from '../../views/room/contexts/RoomContext';
import { useVideoConfWarning } from '../../views/room/contextualBar/VideoConference/hooks/useVideoConfWarning';

export const useVideoCallRoomAction = () => {
    /* Implementation Hidden */
};

```