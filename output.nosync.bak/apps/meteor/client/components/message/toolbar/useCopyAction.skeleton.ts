## File: apps/meteor/client/components/message/toolbar/useCopyAction.ts

```typescript
import type { IMessage, ISubscription } from '@rocket.chat/core-typings';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';

const getMainMessageText = (message: IMessage): IMessage => {
    /* Implementation Hidden */
};

export const useCopyAction = (
	message: IMessage,
	{ subscription }: { subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```