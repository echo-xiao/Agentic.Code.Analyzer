## File: apps/meteor/client/components/message/toolbar/items/VideoconfItems.tsx

```typescript
import type { IRoom, ISubscription, IMessage } from '@rocket.chat/core-typings';

import ReactionMessageAction from './actions/ReactionMessageAction';
import ReplyInThreadMessageAction from './actions/ReplyInThreadMessageAction';

export type VideoconfItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const VideoconfItems = ({ message, room, subscription }: VideoconfItemsProps) => {
    /* Implementation Hidden */
};

export default VideoconfItems;

```