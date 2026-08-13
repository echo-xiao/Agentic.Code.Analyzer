## File: apps/meteor/client/lib/chats/flows/processMessageEditing.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { MessageTypes } from '@rocket.chat/message-types';

import { dispatchToastMessage } from '../../toast';
import type { ChatAPI } from '../ChatAPI';

export const processMessageEditing = async (
	chat: ChatAPI,
	message: Pick<IMessage, '_id' | 't'> & Partial<Omit<IMessage, '_id' | 't'>>,
	previewUrls?: string[],
): Promise<boolean> => {
    /* Implementation Hidden */
};

```