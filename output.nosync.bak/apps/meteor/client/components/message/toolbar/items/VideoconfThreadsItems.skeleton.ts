## File: apps/meteor/client/components/message/toolbar/items/VideoconfThreadsItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import JumpToMessageAction from './actions/JumpToMessageAction';
import ReactionMessageAction from './actions/ReactionMessageAction';

export type VideoconfThreadsItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const VideoconfThreadsItems = ({ message, room, subscription }: VideoconfThreadsItemsProps) => {
    /* Implementation Hidden */
};

export default VideoconfThreadsItems;

```