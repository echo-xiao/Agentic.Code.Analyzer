## File: packages/apps/base-runtime/src/lib/accessors/builders/DiscussionBuilder.ts

```typescript
import type { IDiscussionBuilder } from '@rocket.chat/apps-engine/definition/accessors/IDiscussionBuilder';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages/IMessage';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata/RocketChatAssociations';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms/IRoom';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms/RoomType';

import { RoomBuilder } from './RoomBuilder';

export class DiscussionBuilder extends RoomBuilder implements IDiscussionBuilder {
	public declare kind: RocketChatAssociationModel.DISCUSSION;

	private reply?: string;

	private parentMessage?: IMessage;

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