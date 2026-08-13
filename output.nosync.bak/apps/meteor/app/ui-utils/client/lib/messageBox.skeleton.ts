## File: apps/meteor/app/ui-utils/client/lib/messageBox.ts

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import type { Keys as IconName } from '@rocket.chat/icons';
import type { TranslationKey } from '@rocket.chat/ui-contexts';

import type { ChatAPI } from '../../../../client/lib/chats/ChatAPI';

export type MessageBoxAction = {
	label: TranslationKey;
	id: string;
	icon: IconName;
	action: (params: { rid: IRoom['_id']; tmid?: IMessage['_id']; event: Event; chat: ChatAPI }) => void;
	condition?: () => boolean;
};

class MessageBoxActions {
	actions: Map<TranslationKey, MessageBoxAction[]> = new Map();

	add(group: TranslationKey, label: TranslationKey, config: Omit<MessageBoxAction, 'label'>) {
        /* Implementation Hidden */
    }

	remove(group: TranslationKey, expression: RegExp) {
        /* Implementation Hidden */
    }

	get(): Record<TranslationKey, MessageBoxAction[]>;

	get(group: TranslationKey): MessageBoxAction[];

	get(group?: TranslationKey) {
        /* Implementation Hidden */
    }

	getById(id: MessageBoxAction['id']) {
        /* Implementation Hidden */
    }
}

export const messageBox = {
	actions: new MessageBoxActions(),
} as const;

```