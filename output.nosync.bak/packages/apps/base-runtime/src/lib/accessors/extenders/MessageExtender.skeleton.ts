## File: packages/apps/base-runtime/src/lib/accessors/extenders/MessageExtender.ts

```typescript
import type { IMessageExtender } from '@rocket.chat/apps-engine/definition/accessors/IMessageExtender';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages/IMessage';
import type { IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages/IMessageAttachment';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata/RocketChatAssociations';

export class MessageExtender implements IMessageExtender {
	public readonly kind: RocketChatAssociationModel.MESSAGE;

	constructor(private msg: IMessage) {
        /* Implementation Hidden */
    }

	public addCustomField(key: string, value: unknown): IMessageExtender {
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

	private ensureAttachment(): void {
        /* Implementation Hidden */
    }
}

```