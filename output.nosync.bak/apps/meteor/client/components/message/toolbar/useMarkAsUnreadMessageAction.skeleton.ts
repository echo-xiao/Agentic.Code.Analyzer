## File: apps/meteor/client/components/message/toolbar/useMarkAsUnreadMessageAction.ts

```typescript
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import type { ISubscription, IMessage, IRoom } from '@rocket.chat/core-typings';
import { useRouter, useUser } from '@rocket.chat/ui-contexts';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { useMarkAsUnreadMutation } from '../hooks/useMarkAsUnreadMutation';

export const useMarkAsUnreadMessageAction = (
	message: IMessage,
	{ room, subscription }: { room: IRoom; subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```