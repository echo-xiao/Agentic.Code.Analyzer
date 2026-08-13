## File: apps/meteor/server/lib/moderation/deleteReportedMessages.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IUser, IMessage } from '@rocket.chat/core-typings';
import { Messages, Uploads, ReadReceipts, ReadReceiptsArchive } from '@rocket.chat/models';

import { FileUpload } from '../../../app/file-upload/server';
import { settings } from '../../../app/settings/server';

// heavily inspired from message delete taking place in the user deletion process
// in this path we don't care about the apps engine events - it's a "raw" bulk action
export async function deleteReportedMessages(messages: IMessage[], user: IUser): Promise<void> {
    /* Implementation Hidden */
}

```