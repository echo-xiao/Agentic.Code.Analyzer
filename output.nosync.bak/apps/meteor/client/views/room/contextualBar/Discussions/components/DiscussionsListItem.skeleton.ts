## File: apps/meteor/client/views/room/contextualBar/Discussions/components/DiscussionsListItem.tsx

```typescript
import type { IDiscussionMessage } from '@rocket.chat/core-typings';
import {
	Box,
	Message,
	MessageLeftContainer,
	MessageContainer,
	MessageHeader,
	MessageName,
	MessageTimestamp,
	MessageBody,
	MessageBlock,
	MessageMetrics,
	MessageMetricsItem,
	MessageMetricsItemLabel,
	MessageMetricsItemIcon,
} from '@rocket.chat/fuselage';
import { MessageAvatar } from '@rocket.chat/ui-avatar';
import type { ComponentProps, ReactNode } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Emoji from '../../../../../components/Emoji';
import { clickableItem } from '../../../../../lib/clickableItem';

type DiscussionListItemProps = {
	_id: IDiscussionMessage['_id'];
	msg: ReactNode;
	dcount: number;
	dlm: Date | undefined;
	formatDate: (date: Date) => string;
	username: IDiscussionMessage['u']['username'];
	name?: IDiscussionMessage['u']['name'];
	ts: IDiscussionMessage['ts'];
	emoji: IDiscussionMessage['emoji'];
} & Omit<ComponentProps<typeof Box>, 'is'>;

const DiscussionListItem = ({
	_id,
	msg,
	username,
	name = username,
	ts,
	dcount,
	formatDate,
	dlm,
	className = [],
	emoji,
	...props
}: DiscussionListItemProps) => {
    /* Implementation Hidden */
};

export default memo(clickableItem(DiscussionListItem));

```