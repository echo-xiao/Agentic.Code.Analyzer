## File: apps/meteor/client/components/message/toolbar/MessageToolbarItem.tsx

```typescript
import { MessageToolbarItem as FuselageMessageToolbarItem } from '@rocket.chat/fuselage';
import type { Keys as IconName } from '@rocket.chat/icons';
import { useLayoutHiddenActions } from '@rocket.chat/ui-contexts';
import type { MouseEventHandler } from 'react';

export type MessageToolbarItemProps = {
	id: string;
	icon: IconName;
	title: string;
	disabled?: boolean;
	onClick: MouseEventHandler;
};

const MessageToolbarItem = ({ id, icon, title, disabled, onClick }: MessageToolbarItemProps) => {
    /* Implementation Hidden */
};

export default MessageToolbarItem;

```