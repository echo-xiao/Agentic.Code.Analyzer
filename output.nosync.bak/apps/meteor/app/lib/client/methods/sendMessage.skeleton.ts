## File: apps/meteor/app/lib/client/methods/sendMessage.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';

import { onClientMessageReceived } from '../../../../client/lib/onClientMessageReceived';
import { settings } from '../../../../client/lib/settings';
import { dispatchToastMessage } from '../../../../client/lib/toast';
import { getUser, getUserId } from '../../../../client/lib/user';
import { upsertThreadMessageInCache } from '../../../../client/lib/utils/threadMessageUtils';
import { Messages, Rooms } from '../../../../client/stores';
import { trim } from '../../../../lib/utils/stringUtils';
import { t } from '../../../utils/lib/i18n';

export const runOptimisticSendMessage = async (
	message: Partial<IMessage> & { rid: IMessage['rid']; msg: IMessage['msg'] },
): Promise<void> => {
    /* Implementation Hidden */
};

```