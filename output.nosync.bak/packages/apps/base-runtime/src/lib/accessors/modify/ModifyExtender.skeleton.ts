## File: packages/apps/base-runtime/src/lib/accessors/modify/ModifyExtender.ts

```typescript
import type { IMessageExtender } from '@rocket.chat/apps-engine/definition/accessors/IMessageExtender';
import type { IModifyExtender } from '@rocket.chat/apps-engine/definition/accessors/IModifyExtender';
import type { IRoomExtender } from '@rocket.chat/apps-engine/definition/accessors/IRoomExtender';
import type { IVideoConferenceExtender } from '@rocket.chat/apps-engine/definition/accessors/IVideoConferenceExtend';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages/IMessage';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata/RocketChatAssociations';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms/IRoom';
import type { IUser } from '@rocket.chat/apps-engine/definition/users/IUser';
import type { VideoConference } from '@rocket.chat/apps-engine/definition/videoConferences/IVideoConference';

import { AppObjectRegistry } from '../../../AppObjectRegistry';
import type * as Messenger from '../../messenger';
import { MessageExtender } from '../extenders/MessageExtender';
import { RoomExtender } from '../extenders/RoomExtender';
import { VideoConferenceExtender } from '../extenders/VideoConferenceExtend';
import { formatErrorResponse } from '../formatResponseErrorHandler';

export class ModifyExtender implements IModifyExtender {
	constructor(private readonly senderFn: typeof Messenger.sendRequest) {
        /* Implementation Hidden */
    }

	public async extendMessage(messageId: string, updater: IUser): Promise<IMessageExtender> {
        /* Implementation Hidden */
    }

	public async extendRoom(roomId: string, _updater: IUser): Promise<IRoomExtender> {
        /* Implementation Hidden */
    }

	public async extendVideoConference(id: string): Promise<IVideoConferenceExtender> {
        /* Implementation Hidden */
    }

	public async finish(extender: IMessageExtender | IRoomExtender | IVideoConferenceExtender): Promise<void> {
        /* Implementation Hidden */
    }
}

```