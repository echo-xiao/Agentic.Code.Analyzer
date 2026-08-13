## File: apps/meteor/client/components/message/toolbar/items/MentionsItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import JumpToMessageAction from './actions/JumpToMessageAction';

export type MentionsItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const MentionsItems = ({ message }: MentionsItemsProps) => {
    /* Implementation Hidden */
};

export default MentionsItems;

```