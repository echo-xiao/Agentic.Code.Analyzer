## File: apps/meteor/client/components/message/toolbar/items/StarredItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import JumpToMessageAction from './actions/JumpToMessageAction';

export type StarredItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const StarredItems = ({ message }: StarredItemsProps) => {
    /* Implementation Hidden */
};

export default StarredItems;

```