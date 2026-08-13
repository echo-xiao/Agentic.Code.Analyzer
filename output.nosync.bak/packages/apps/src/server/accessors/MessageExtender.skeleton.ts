## File: packages/apps/src/server/accessors/MessageExtender.ts

```typescript
import type { IMessageExtender } from '@rocket.chat/apps-engine/definition/accessors';
import type { IMessage, IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';

import { Utilities } from '../misc/Utilities';

export class MessageExtender implements IMessageExtender {
	public readonly kind: RocketChatAssociationModel.MESSAGE;

	constructor(private msg: IMessage) {
        /* Implementation Hidden */
    }

	public addCustomField(key: string, value: any): IMessageExtender {
        /* Implementation Hidden */
    }

	public addAttachment(attachment: IMessageAttachment): IMessageExtender {
        /* Implementation Hidden */
    }

	public addAttachments(attachments: Array<IMessageAttachment>): IMessageExtender {
        /* Implementation Hidden */
    }

	public getMessage(): IMessage {
        /* Implementation Hidden */
    }
}

```