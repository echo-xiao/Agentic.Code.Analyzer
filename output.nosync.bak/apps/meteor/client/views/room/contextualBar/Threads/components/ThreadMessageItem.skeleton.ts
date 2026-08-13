## File: apps/meteor/client/views/room/contextualBar/Threads/components/ThreadMessageItem.tsx

```typescript
import type { IThreadMainMessage, IThreadMessage } from '@rocket.chat/core-typings';
import { Box, Bubble, MessageDivider } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import SystemMessage from '../../../../../components/message/variants/SystemMessage';
import ThreadMessage from '../../../../../components/message/variants/ThreadMessage';
import { useFormatDate } from '../../../../../hooks/useFormatDate';
import { isMessageNewDay } from '../../../MessageList/lib/isMessageNewDay';
import { useDateRef } from '../../../providers/DateListProvider';

type ThreadMessageProps = {
	message: IThreadMessage | IThreadMainMessage;
	previous: IThreadMessage | IThreadMainMessage;
	sequential: boolean;
	shouldShowAsSequential: boolean;
	showUserAvatar: boolean;
	firstUnread: boolean;
	system: boolean;
};

export const ThreadMessageItem = ({
	message,
	previous,
	shouldShowAsSequential,
	showUserAvatar,
	firstUnread,
	system,
}: ThreadMessageProps) => {
    /* Implementation Hidden */
};

```