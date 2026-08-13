## File: apps/meteor/client/components/message/toolbar/useReportMessageAction.tsx

```typescript
import type { ISubscription, IRoom, IMessage } from '@rocket.chat/core-typings';
import { useSetModal, useUser } from '@rocket.chat/ui-contexts';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';
import ReportMessageModal from '../../../views/room/modals/ReportMessageModal';

const getMainMessageText = (message: IMessage): IMessage => {
    /* Implementation Hidden */
};

export const useReportMessageAction = (
	message: IMessage,
	{ room, subscription }: { room: IRoom; subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```