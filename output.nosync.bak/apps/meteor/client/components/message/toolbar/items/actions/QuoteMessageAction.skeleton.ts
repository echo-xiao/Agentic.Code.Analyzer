## File: apps/meteor/client/components/message/toolbar/items/actions/QuoteMessageAction.tsx

```typescript
import {
	type ITranslatedMessage,
	type IMessage,
	type ISubscription,
	isRoomFederated,
	isRoomNativeFederated,
} from '@rocket.chat/core-typings';
import { useTranslation } from 'react-i18next';

import { useChat } from '../../../../../views/room/contexts/ChatContext';
import { useRoom } from '../../../../../views/room/contexts/RoomContext';
import { useMessageListAutoTranslate } from '../../../list/MessageListContext';
import MessageToolbarItem from '../../MessageToolbarItem';

export type QuoteMessageActionProps = {
	message: IMessage & Partial<ITranslatedMessage>;
	subscription: ISubscription | undefined;
};

const QuoteMessageAction = ({ message, subscription }: QuoteMessageActionProps) => {
    /* Implementation Hidden */
};

export default QuoteMessageAction;

```