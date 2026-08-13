## File: apps/meteor/client/lib/chats/flows/requestMessageDeletion.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { imperativeModal } from '@rocket.chat/ui-client';

import { t } from '../../../../app/utils/lib/i18n';
import DeleteMessageConfirmModal from '../../../views/room/modals/DeleteMessageConfirmModal';
import { dispatchToastMessage } from '../../toast';
import type { ChatAPI } from '../ChatAPI';

export const requestMessageDeletion = async (chat: ChatAPI, message: IMessage): Promise<void> => {
    /* Implementation Hidden */
};

```