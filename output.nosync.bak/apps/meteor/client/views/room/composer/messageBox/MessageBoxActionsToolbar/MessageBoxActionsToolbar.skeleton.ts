## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxActionsToolbar/MessageBoxActionsToolbar.tsx

```typescript
import type { IRoom, IMessage } from '@rocket.chat/core-typings';
import type { Icon } from '@rocket.chat/fuselage';
import { isTruthy } from '@rocket.chat/tools';
import { GenericMenu, type GenericMenuItemProps } from '@rocket.chat/ui-client';
import { MessageComposerAction, MessageComposerActionsDivider } from '@rocket.chat/ui-composer';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useTranslation, useLayoutHiddenActions } from '@rocket.chat/ui-contexts';
import type { ComponentProps, MouseEvent } from 'react';
import { memo } from 'react';

import { useAudioMessageAction } from './hooks/useAudioMessageAction';
import { useCreateDiscussionAction } from './hooks/useCreateDiscussionAction';
import { useFileUploadAction } from './hooks/useFileUploadAction';
import { useShareLocationAction } from './hooks/useShareLocationAction';
import { useTimestampAction } from './hooks/useTimestampAction';
import { useVideoMessageAction } from './hooks/useVideoMessageAction';
import { useWebdavActions } from './hooks/useWebdavActions';
import { messageBox } from '../../../../../../app/ui-utils/client';
import { useMessageboxAppsActionButtons } from '../../../../../hooks/useMessageboxAppsActionButtons';
import { useChat } from '../../../contexts/ChatContext';
import { useRoom } from '../../../contexts/RoomContext';

type MessageBoxActionsToolbarProps = {
	canSend: boolean;
	isMicrophoneDenied: boolean;
	variant: 'small' | 'large';
	isRecording: boolean;
	rid: IRoom['_id'];
	tmid?: IMessage['_id'];
	isEditing: boolean;
};

const isHidden = (hiddenActions: Array<string>, action: GenericMenuItemProps) => {
    /* Implementation Hidden */
};

const MessageBoxActionsToolbar = ({
	canSend,
	isRecording,
	rid,
	tmid,
	variant = 'large',
	isMicrophoneDenied,
	isEditing = false,
}: MessageBoxActionsToolbarProps) => {
    /* Implementation Hidden */
};

export default memo(MessageBoxActionsToolbar);

```