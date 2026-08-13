## File: packages/apps/src/server/accessors/DiscussionBuilder.ts

```typescript
import type { IDiscussionBuilder } from '@rocket.chat/apps-engine/definition/accessors';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms/IRoom';

import { RoomBuilder } from './RoomBuilder';

export class DiscussionBuilder extends RoomBuilder implements IDiscussionBuilder {
	public kind: RocketChatAssociationModel.DISCUSSION;

	private reply: string;

	private parentMessage: IMessage;

	constructor(data?: Partial<IRoom>) {
        /* Implementation Hidden */
    }

	public setParentRoom(parentRoom: IRoom): IDiscussionBuilder {
        /* Implementation Hidden */
    }

	public getParentRoom(): IRoom {
        /* Implementation Hidden */
    }

	public setReply(reply: string): IDiscussionBuilder {
        /* Implementation Hidden */
    }

	public getReply(): string {
        /* Implementation Hidden */
    }

	public setParentMessage(parentMessage: IMessage): IDiscussionBuilder {
        /* Implementation Hidden */
    }

	public getParentMessage(): IMessage {
        /* Implementation Hidden */
    }
}

```