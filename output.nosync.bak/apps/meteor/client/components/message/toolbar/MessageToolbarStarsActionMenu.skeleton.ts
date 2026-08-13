## File: apps/meteor/client/components/message/toolbar/MessageToolbarStarsActionMenu.tsx

```typescript
import { isE2EEMessage, type IMessage } from '@rocket.chat/core-typings';
import { GenericMenu, type GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { useMessageActionAppsActionButtons } from './useMessageActionAppsActionButtons';
import type { MessageActionContext } from '../../../../app/ui-utils/client/lib/MessageAction';

type MessageActionSection = {
	id: string;
	title: string;
	items: GenericMenuItemProps[];
};

type MessageActionMenuProps = {
	message: IMessage;
	context: MessageActionContext;
	onChangeMenuVisibility: (visible: boolean) => void;
};

const MessageToolbarStarsActionMenu = ({ message, context, onChangeMenuVisibility }: MessageActionMenuProps) => {
    /* Implementation Hidden */
};

export default MessageToolbarStarsActionMenu;

```