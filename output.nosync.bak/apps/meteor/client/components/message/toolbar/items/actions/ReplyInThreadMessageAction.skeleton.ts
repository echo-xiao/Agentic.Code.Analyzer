## File: apps/meteor/client/components/message/toolbar/items/actions/ReplyInThreadMessageAction.tsx

```typescript
import {
	type IMessage,
	type ISubscription,
	type IRoom,
	isOmnichannelRoom,
	isRoomFederated,
	isRoomNativeFederated,
} from '@rocket.chat/core-typings';
import { useRouter, useSetting } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import MessageToolbarItem from '../../MessageToolbarItem';

export type ReplyInThreadMessageActionProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const ReplyInThreadMessageAction = ({ message, room, subscription }: ReplyInThreadMessageActionProps) => {
    /* Implementation Hidden */
};

export default ReplyInThreadMessageAction;

```