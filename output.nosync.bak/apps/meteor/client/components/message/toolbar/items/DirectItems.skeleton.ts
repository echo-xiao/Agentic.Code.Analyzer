## File: apps/meteor/client/components/message/toolbar/items/DirectItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import JumpToMessageAction from './actions/JumpToMessageAction';

export type DirectItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const DirectItems = ({ message, subscription }: DirectItemsProps) => {
    /* Implementation Hidden */
};

export default DirectItems;

```