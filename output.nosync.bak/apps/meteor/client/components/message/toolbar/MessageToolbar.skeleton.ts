## File: apps/meteor/client/components/message/toolbar/MessageToolbar.tsx

```typescript
import { useToolbar } from '@react-aria/toolbar';
import type { IMessage, IRoom, ISubscription, ITranslatedMessage } from '@rocket.chat/core-typings';
import { isThreadMessage, isRoomFederated, isVideoConfMessage } from '@rocket.chat/core-typings';
import { MessageToolbar as FuselageMessageToolbar } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import type { ComponentProps, ElementType } from 'react';
import { memo, useRef } from 'react';

import MessageToolbarActionMenu from './MessageToolbarActionMenu';
import MessageToolbarStarsActionMenu from './MessageToolbarStarsActionMenu';
import DefaultItems from './items/DefaultItems';
import DirectItems from './items/DirectItems';
import FederatedItems from './items/FederatedItems';
import MentionsItems from './items/MentionsItems';
import MobileItems from './items/MobileItems';
import PinnedItems from './items/PinnedItems';
import SearchItems from './items/SearchItems';
import StarredItems from './items/StarredItems';
import ThreadsItems from './items/ThreadsItems';
import VideoconfItems from './items/VideoconfItems';
import VideoconfThreadsItems from './items/VideoconfThreadsItems';
import type { MessageActionContext } from '../../../../app/ui-utils/client/lib/MessageAction';

const getMessageContext = (message: IMessage, room: IRoom, context?: MessageActionContext): MessageActionContext => {
    /* Implementation Hidden */
};

const itemsByContext: Record<
	MessageActionContext,
	ElementType<{ message: IMessage; room: IRoom; subscription: ISubscription | undefined }>
> = {
	'message': DefaultItems,
	'message-mobile': MobileItems,
	'threads': ThreadsItems,
	'videoconf': VideoconfItems,
	'videoconf-threads': VideoconfThreadsItems,
	'pinned': PinnedItems,
	'direct': DirectItems,
	'starred': StarredItems,
	'mentions': MentionsItems,
	'federated': FederatedItems,
	'search': SearchItems,
};

export type MessageToolbarProps = {
	message: IMessage & Partial<ITranslatedMessage>;
	messageContext?: MessageActionContext;
	room: IRoom;
	subscription?: ISubscription;
	onChangeMenuVisibility: (visible: boolean) => void;
} & ComponentProps<typeof FuselageMessageToolbar>;

const MessageToolbar = ({ message, messageContext, room, subscription, onChangeMenuVisibility, ...props }: MessageToolbarProps) => {
    /* Implementation Hidden */
};

export default memo(MessageToolbar);

```