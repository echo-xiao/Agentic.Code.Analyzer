## File: apps/meteor/client/components/message/toolbar/items/SearchItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import JumpToMessageAction from './actions/JumpToMessageAction';

export type SearchItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const SearchItems = ({ message }: SearchItemsProps) => {
    /* Implementation Hidden */
};

export default SearchItems;

```