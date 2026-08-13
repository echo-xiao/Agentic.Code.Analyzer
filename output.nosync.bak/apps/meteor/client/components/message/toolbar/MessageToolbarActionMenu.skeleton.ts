## File: apps/meteor/client/components/message/toolbar/MessageToolbarActionMenu.tsx

```typescript
import { isE2EEMessage, type IMessage, type IRoom, type ISubscription } from '@rocket.chat/core-typings';
import { isTruthy } from '@rocket.chat/tools';
import { GenericMenu, type GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useLayoutHiddenActions } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { useCopyAction } from './useCopyAction';
import { useDeleteMessageAction } from './useDeleteMessageAction';
import { useEditMessageAction } from './useEditMessageAction';
import { useFollowMessageAction } from './useFollowMessageAction';
import { useMarkAsUnreadMessageAction } from './useMarkAsUnreadMessageAction';
import { useMessageActionAppsActionButtons } from './useMessageActionAppsActionButtons';
import { useNewDiscussionMessageAction } from './useNewDiscussionMessageAction';
import { usePermalinkAction } from './usePermalinkAction';
import { usePinMessageAction } from './usePinMessageAction';
import { useReadReceiptsDetailsAction } from './useReadReceiptsDetailsAction';
import { useReplyInDMAction } from './useReplyInDMAction';
import { useReportMessageAction } from './useReportMessageAction';
import { useShowMessageReactionsAction } from './useShowMessageReactionsAction';
import { useStarMessageAction } from './useStarMessageAction';
import { useTranslateAction } from './useTranslateAction';
import { useUnFollowMessageAction } from './useUnFollowMessageAction';
import { useUnpinMessageAction } from './useUnpinMessageAction';
import { useUnstarMessageAction } from './useUnstarMessageAction';
import { useViewOriginalTranslationAction } from './useViewOriginalTranslationAction';
import { useWebDAVMessageAction } from './useWebDAVMessageAction';
import type { MessageActionContext } from '../../../../app/ui-utils/client/lib/MessageAction';

type MessageActionSection = {
	id: string;
	title: string;
	items: GenericMenuItemProps[];
};

export type MessageToolbarActionMenuProps = {
	message: IMessage;
	context: MessageActionContext;
	room: IRoom;
	subscription: ISubscription | undefined;
	onChangeMenuVisibility: (visible: boolean) => void;
};

const MessageToolbarActionMenu = ({ message, context, room, subscription, onChangeMenuVisibility }: MessageToolbarActionMenuProps) => {
    /* Implementation Hidden */
};

export default MessageToolbarActionMenu;

```