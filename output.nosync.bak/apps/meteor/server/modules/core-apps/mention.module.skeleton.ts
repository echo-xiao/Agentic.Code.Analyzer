## File: apps/meteor/server/modules/core-apps/mention.module.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IUiKitCoreApp, UiKitCoreAppBlockActionPayload } from '@rocket.chat/core-services';
import type { IMessage, IUser } from '@rocket.chat/core-typings';
import { Subscriptions, Messages } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { addUsersToRoomMethod } from '../../../app/lib/server/methods/addUsersToRoom';
import { i18n } from '../../lib/i18n';
import { processWebhookMessage } from '../../lib/messages/processWebhookMessage';
import { roomCoordinator } from '../../lib/rooms/roomCoordinator';

const retrieveMentionsFromPayload = (stringifiedMentions: string): Exclude<IMessage['mentions'], undefined> => {
    /* Implementation Hidden */
};

export class MentionModule implements IUiKitCoreApp {
	appId = 'mention-core';

	async blockAction(payload: UiKitCoreAppBlockActionPayload): Promise<undefined> {
        /* Implementation Hidden */
    }
}

```