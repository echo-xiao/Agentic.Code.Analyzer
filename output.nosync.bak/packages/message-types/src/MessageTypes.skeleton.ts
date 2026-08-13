## File: packages/message-types/src/MessageTypes.ts

```typescript
import type { MessageTypesValues, IMessage } from '@rocket.chat/core-typings';
import type { TFunction } from 'i18next';

type MessageType = {
	readonly id: MessageTypesValues;
	readonly system: boolean;
	readonly text: (t: TFunction, message: IMessage) => string;
};

export class MessageTypes {
	private types = new Map<MessageTypesValues, MessageType>();

	registerType(options: MessageType): void {
        /* Implementation Hidden */
    }

	getType(message: Pick<IMessage, 't'>): MessageType | undefined {
        /* Implementation Hidden */
    }

	isSystemMessage(message: Pick<IMessage, 't'>): boolean {
        /* Implementation Hidden */
    }
}

```