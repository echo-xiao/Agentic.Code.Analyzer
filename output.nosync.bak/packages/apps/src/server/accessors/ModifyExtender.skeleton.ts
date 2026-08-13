## File: packages/apps/src/server/accessors/ModifyExtender.ts

```typescript
import type {
	IMessageExtender,
	IModifyExtender,
	IRoomExtender,
	IVideoConferenceExtender,
} from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { MessageExtender } from './MessageExtender';
import { RoomExtender } from './RoomExtender';
import { VideoConferenceExtender } from './VideoConferenceExtend';
import type { AppBridges } from '../bridges/AppBridges';

export class ModifyExtender implements IModifyExtender {
	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
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

	public finish(extender: IMessageExtender | IRoomExtender | IVideoConferenceExtender): Promise<void> {
        /* Implementation Hidden */
    }
}

```