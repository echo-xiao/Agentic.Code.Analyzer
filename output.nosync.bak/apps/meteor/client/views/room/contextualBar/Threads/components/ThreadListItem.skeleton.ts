## File: apps/meteor/client/views/room/contextualBar/Threads/components/ThreadListItem.tsx

```typescript
import type { IThreadMainMessage } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Palette } from '@rocket.chat/fuselage';
import { useSetting, useUserId } from '@rocket.chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useCallback, memo } from 'react';

import ThreadListMessage from './ThreadListMessage';
import { useDecryptedMessage } from '../../../../../hooks/useDecryptedMessage';
import { normalizeThreadMessage } from '../../../../../lib/normalizeThreadMessage';

type ThreadListItemProps = {
	thread: IThreadMainMessage;
	unread: string[];
	unreadUser: string[];
	unreadGroup: string[];
	onClick: (tmid: IThreadMainMessage['_id']) => void;
};

const ThreadListItem = ({ thread, unread, unreadUser, unreadGroup, onClick }: ThreadListItemProps) => {
    /* Implementation Hidden */
};

export default memo(ThreadListItem);

```