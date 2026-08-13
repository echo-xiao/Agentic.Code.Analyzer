## File: apps/meteor/client/components/message/toolbar/useNewDiscussionMessageAction.tsx

```typescript
import type { IMessage, IRoom, ISubscription } from '@rocket.chat/core-typings';
import { usePermission, useSetModal, useSetting, useUser } from '@rocket.chat/ui-contexts';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';
import CreateDiscussion from '../../CreateDiscussion';

export const useNewDiscussionMessageAction = (
	message: IMessage,
	{ room, subscription }: { room: IRoom; subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```