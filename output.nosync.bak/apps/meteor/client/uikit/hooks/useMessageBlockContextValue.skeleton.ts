## File: apps/meteor/client/uikit/hooks/useMessageBlockContextValue.ts

```typescript
import type { IRoom, IMessage } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { UiKitContext } from '@rocket.chat/fuselage-ui-kit';
import { useRoomToolbox } from '@rocket.chat/ui-contexts';
import {
	useVideoConfDispatchOutgoing,
	useVideoConfIsCalling,
	useVideoConfIsRinging,
	useVideoConfJoinCall,
	useVideoConfLoadCapabilities,
	useVideoConfSetPreferences,
} from '@rocket.chat/ui-video-conf';
import type { ContextType } from 'react';

import { useUiKitActionManager } from './useUiKitActionManager';
import { useVideoConfWarning } from '../../views/room/contextualBar/VideoConference/hooks/useVideoConfWarning';

export const useMessageBlockContextValue = (rid: IRoom['_id'], mid: IMessage['_id']): ContextType<typeof UiKitContext> => {
    /* Implementation Hidden */
};

```