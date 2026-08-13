## File: apps/meteor/client/views/room/contextualBar/Threads/components/ThreadListMetrics.tsx

```typescript
import { MessageMetricsItem, MessageBlock, MessageMetrics, MessageMetricsItemIcon, MessageMetricsItemLabel } from '@rocket.chat/fuselage';
import { useResizeObserver } from '@rocket.chat/fuselage-hooks';
import { useTranslation } from '@rocket.chat/ui-contexts';

import ThreadMetricsParticipants from '../../../../../components/message/content/ThreadMetricsParticipants';
import { useTimeAgo } from '../../../../../hooks/useTimeAgo';

type ThreadMetricsProps = {
	lm: Date;
	counter: number;
	participants: Array<string>;
};

const ThreadListMetrics = ({ counter, participants, lm }: ThreadMetricsProps) => {
    /* Implementation Hidden */
};

export default ThreadListMetrics;

```