## File: apps/meteor/client/components/message/toolbar/items/actions/ReactionMessageAction.tsx

```typescript
import {
	isOmnichannelRoom,
	isRoomFederated,
	isRoomNativeFederated,
	type IMessage,
	type IRoom,
	type ISubscription,
} from '@rocket.chat/core-typings';
import { useUser, useEndpoint, usePermission } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useEmojiPickerData } from '../../../../../contexts/EmojiPickerContext';
import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';
import EmojiElement from '../../../../../views/composer/EmojiPicker/EmojiElement';
import { useChat } from '../../../../../views/room/contexts/ChatContext';
import MessageToolbarItem from '../../MessageToolbarItem';

export type ReactionMessageActionProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const ReactionMessageAction = ({ message, room, subscription }: ReactionMessageActionProps) => {
    /* Implementation Hidden */
};

export default ReactionMessageAction;

```