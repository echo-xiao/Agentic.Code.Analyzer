## File: apps/meteor/client/lib/chats/flows/processTooLongMessage.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { GenericModal, imperativeModal } from '@rocket.chat/ui-client';

import { t } from '../../../../app/utils/lib/i18n';
import { settings } from '../../settings';
import { dispatchToastMessage } from '../../toast';
import { getUser } from '../../user';
import type { ChatAPI } from '../ChatAPI';

export const processTooLongMessage = async (chat: ChatAPI, { msg }: Pick<IMessage, 'msg'>): Promise<boolean> => {
    /* Implementation Hidden */
};

```