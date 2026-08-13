## File: apps/meteor/client/components/message/toolbar/items/PinnedItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import JumpToMessageAction from './actions/JumpToMessageAction';

export type PinnedItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const PinnedItems = ({ message }: PinnedItemsProps) => {
    /* Implementation Hidden */
};

export default PinnedItems;

```