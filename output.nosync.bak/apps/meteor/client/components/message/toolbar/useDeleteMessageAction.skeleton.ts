## File: apps/meteor/client/components/message/toolbar/useDeleteMessageAction.ts

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { ISubscription, IRoom, IMessage } from '@rocket.chat/core-typings';
import { useUser } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';
import { useChat } from '../../../views/room/contexts/ChatContext';

export const useDeleteMessageAction = (
	message: IMessage,
	{ room, subscription }: { room: IRoom; subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```