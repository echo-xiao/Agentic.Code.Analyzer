## File: apps/meteor/client/views/room/MessageList/providers/messageHighlightSubscription.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';

type SetHighlightFn = (_id: IMessage['_id']) => void;
type ClearHighlightFn = () => void;

type MessageHighlightSubscription = {
	subscribe: (callback: () => void) => () => void;
	getSnapshot: () => IMessage['_id'] | undefined;
	setHighlight: SetHighlightFn;
	clearHighlight: ClearHighlightFn;
};

const createMessageHighlightSubscription = (): MessageHighlightSubscription => {
    /* Implementation Hidden */
};

export const {
	getSnapshot,
	subscribe,
	setHighlight: setHighlightMessage,
	clearHighlight: clearHighlightMessage,
} = createMessageHighlightSubscription();

```