## File: apps/meteor/client/views/mediaCallHistory/useMediaCallInternalHistoryActions.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useGoToDirectMessage } from '@rocket.chat/ui-client';
import { useRouter, useUserAvatarPath } from '@rocket.chat/ui-contexts';
import { useWidgetExternalControls, usePeekMediaSessionState, type CallHistoryInternalContact } from '@rocket.chat/ui-voip';
import { useMemo } from 'react';

type UseMediaCallInternalHistoryActionsBaseOptions = {
	contact: CallHistoryInternalContact;
	messageId?: string;
	openRoomId?: string;
	messageRoomId?: string;
	openUserInfo?: (userId: string) => void;
};

export const useMediaCallInternalHistoryActions = ({
	contact,
	messageId,
	openRoomId,
	messageRoomId,
	openUserInfo,
}: UseMediaCallInternalHistoryActionsBaseOptions) => {
    /* Implementation Hidden */
};

```