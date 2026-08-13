## File: apps/meteor/client/lib/chats/data.ts

```typescript
import { isEncryptedMessageContent, type IEditedMessage, type IMessage, type IRoom, type ISubscription } from '@rocket.chat/core-typings';
import { MessageTypes } from '@rocket.chat/message-types';
import { Random } from '@rocket.chat/random';
import { differenceInMinutes } from 'date-fns';

import type { DataAPI } from './ChatAPI';
import { hasAtLeastOnePermission, hasPermission } from '../../../app/authorization/client';
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { Messages, Rooms, Subscriptions } from '../../stores';
import { settings } from '../settings';
import { getUserId } from '../user';
import { mapMessageFromApi } from '../utils/mapMessageFromApi';
import { prependReplies } from '../utils/prependReplies';
import { upsertThreadMessageInCache } from '../utils/threadMessageUtils';

export const createDataAPI = ({ rid, tmid }: { rid: IRoom['_id']; tmid: IMessage['_id'] | undefined }): DataAPI => {
    /* Implementation Hidden */
};

```