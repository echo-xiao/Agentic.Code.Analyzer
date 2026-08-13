## File: apps/meteor/client/components/message/toolbar/items/ThreadsItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import ForwardMessageAction from './actions/ForwardMessageAction';
import JumpToMessageAction from './actions/JumpToMessageAction';
import QuoteMessageAction from './actions/QuoteMessageAction';
import ReactionMessageAction from './actions/ReactionMessageAction';

export type ThreadsItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const ThreadsItems = ({ message, room, subscription }: ThreadsItemsProps) => {
    /* Implementation Hidden */
};

export default ThreadsItems;

```