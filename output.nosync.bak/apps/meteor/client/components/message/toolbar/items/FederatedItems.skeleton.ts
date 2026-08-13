## File: apps/meteor/client/components/message/toolbar/items/FederatedItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import QuoteMessageAction from './actions/QuoteMessageAction';
import ReactionMessageAction from './actions/ReactionMessageAction';
import ReplyInThreadMessageAction from './actions/ReplyInThreadMessageAction';

export type FederatedItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const FederatedItems = ({ message, room, subscription }: FederatedItemsProps) => {
    /* Implementation Hidden */
};

export default FederatedItems;

```