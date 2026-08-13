## File: apps/meteor/client/components/message/toolbar/items/MobileItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import ForwardMessageAction from './actions/ForwardMessageAction';
import JumpToMessageAction from './actions/JumpToMessageAction';
import QuoteMessageAction from './actions/QuoteMessageAction';
import ReactionMessageAction from './actions/ReactionMessageAction';
import ReplyInThreadMessageAction from './actions/ReplyInThreadMessageAction';

export type MobileItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const MobileItems = ({ message, room, subscription }: MobileItemsProps) => {
    /* Implementation Hidden */
};

export default MobileItems;

```