## File: apps/meteor/client/components/message/content/ThreadMetrics.tsx

```typescript
import {
	MessageMetricsItem,
	MessageBlock,
	MessageMetrics,
	MessageMetricsReply,
	MessageMetricsItemIcon,
	MessageMetricsItemLabel,
} from '@rocket.chat/fuselage';
import { useResizeObserver } from '@rocket.chat/fuselage-hooks';
import { useTranslation } from 'react-i18next';

import ThreadMetricsFollow from './ThreadMetricsFollow';
import ThreadMetricsParticipants from './ThreadMetricsParticipants';
import { useTimeAgo } from '../../../hooks/useTimeAgo';
import { useGoToThread } from '../../../views/room/hooks/useGoToThread';

export type ThreadMetricsProps = {
	unread: boolean;
	mention: boolean;
	all: boolean;
	lm: Date;
	mid: string;
	rid: string;
	counter: number;
	participants: string[];
	following: boolean;
};

const ThreadMetrics = ({ unread, mention, all, rid, mid, counter, participants, following, lm }: ThreadMetricsProps) => {
    /* Implementation Hidden */
};

export default ThreadMetrics;

```