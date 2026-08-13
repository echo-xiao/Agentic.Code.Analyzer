## File: apps/meteor/client/components/message/toolbar/useUnpinMessageAction.ts

```typescript
import type { IMessage, IRoom, ISubscription } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { useSetting, usePermission } from '@rocket.chat/ui-contexts';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { useUnpinMessageMutation } from '../hooks/useUnpinMessageMutation';

export const useUnpinMessageAction = (
	message: IMessage,
	{ room, subscription }: { room: IRoom; subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```