## File: apps/meteor/client/lib/chats/flows/processSetReaction.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';

import { emoji } from '../../../../app/emoji/client';
import { runOptimisticSetReaction } from '../../../../app/reactions/client/methods/setReaction';
import { sdk } from '../../../../app/utils/client/lib/SDKClient';
import { dispatchToastMessage } from '../../toast';
import type { ChatAPI } from '../ChatAPI';

export const processSetReaction = async (chat: ChatAPI, { msg }: Pick<IMessage, 'msg'>): Promise<boolean> => {
    /* Implementation Hidden */
};

```