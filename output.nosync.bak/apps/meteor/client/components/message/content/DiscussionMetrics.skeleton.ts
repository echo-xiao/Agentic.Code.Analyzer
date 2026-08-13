## File: apps/meteor/client/components/message/content/DiscussionMetrics.tsx

```typescript
import {
	MessageBlock,
	MessageMetrics,
	MessageMetricsItem,
	MessageMetricsItemIcon,
	MessageMetricsItemLabel,
	MessageMetricsReply,
} from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { useTimeAgo } from '../../../hooks/useTimeAgo';
import { useGoToRoom } from '../../../views/room/hooks/useGoToRoom';

export type DiscussionMetricsProps = {
	drid: string;
	rid: string;
	count: number;
	lm?: Date;
};

const DiscussionMetrics = ({ lm, count, rid, drid }: DiscussionMetricsProps) => {
    /* Implementation Hidden */
};

export default DiscussionMetrics;

```