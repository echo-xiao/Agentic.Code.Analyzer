## File: apps/meteor/client/components/message/toolbar/items/DefaultItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import ForwardMessageAction from './actions/ForwardMessageAction';
import QuoteMessageAction from './actions/QuoteMessageAction';
import ReactionMessageAction from './actions/ReactionMessageAction';
import ReplyInThreadMessageAction from './actions/ReplyInThreadMessageAction';

export type DefaultItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const DefaultItems = ({ message, room, subscription }: DefaultItemsProps) => {
    /* Implementation Hidden */
};

export default DefaultItems;

```