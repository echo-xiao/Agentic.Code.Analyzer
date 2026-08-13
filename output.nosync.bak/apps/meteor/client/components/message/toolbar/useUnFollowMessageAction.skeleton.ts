## File: apps/meteor/client/components/message/toolbar/useUnFollowMessageAction.ts

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { useSetting, useToastMessageDispatch, useUser } from '@rocket.chat/ui-contexts';

import type { MessageActionContext, MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { t } from '../../../../app/utils/lib/i18n';
import { Messages } from '../../../stores';
import { useToggleFollowingThreadMutation } from '../../../views/room/contextualBar/Threads/hooks/useToggleFollowingThreadMutation';

export const useUnFollowMessageAction = (
	message: IMessage,
	{ room, context }: { room: IRoom; context: MessageActionContext },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```