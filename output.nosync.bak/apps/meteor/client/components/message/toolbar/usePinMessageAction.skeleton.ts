## File: apps/meteor/client/components/message/toolbar/usePinMessageAction.tsx

```typescript
import type { IMessage, IRoom, ISubscription } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { useSetting, useSetModal, usePermission } from '@rocket.chat/ui-contexts';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import PinMessageModal from '../../../views/room/modals/PinMessageModal';
import { usePinMessageMutation } from '../hooks/usePinMessageMutation';

export const usePinMessageAction = (
	message: IMessage,
	{ room, subscription }: { room: IRoom; subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```