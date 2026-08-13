## File: apps/meteor/client/components/message/toolbar/useEditMessageAction.ts

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { IRoom, IMessage, ISubscription } from '@rocket.chat/core-typings';
import { usePermission, useSetting, useUser } from '@rocket.chat/ui-contexts';
import { differenceInMinutes } from 'date-fns';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { useChat } from '../../../views/room/contexts/ChatContext';

export const useEditMessageAction = (
	message: IMessage,
	{ room, subscription }: { room: IRoom; subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```