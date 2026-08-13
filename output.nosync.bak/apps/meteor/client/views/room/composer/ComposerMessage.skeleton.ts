## File: apps/meteor/client/views/room/composer/ComposerMessage.tsx

```typescript
import type { IMessage, ISubscription } from '@rocket.chat/core-typings';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { memo, useMemo, useSyncExternalStore } from 'react';

import ComposerSkeleton from './ComposerSkeleton';
import { LegacyRoomManager } from '../../../../app/ui-utils/client';
import { useChat } from '../contexts/ChatContext';
import { useRoom } from '../contexts/RoomContext';
import MessageBox from './messageBox/MessageBox';

export type ComposerMessageProps = {
	tmid?: IMessage['_id'];
	children?: ReactNode;
	subscription?: ISubscription;
	tshow?: boolean;
	previewUrls?: string[];
	onResize?: () => void;
	onEscape?: () => void;
	onSend?: () => void;
	onNavigateToNextMessage?: () => void;
	onNavigateToPreviousMessage?: () => void;
	onClickSelectAll?: () => void;
};

const ComposerMessage = ({ tmid, onSend, ...props }: ComposerMessageProps) => {
    /* Implementation Hidden */
};

export default memo(ComposerMessage);

```