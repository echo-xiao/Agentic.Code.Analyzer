## File: apps/meteor/client/components/message/content/ThreadMetricsFollow.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { MessageMetricsItem, MessageMetricsFollowing } from '@rocket.chat/fuselage';
import { useToastMessageDispatch, useTranslation } from '@rocket.chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useCallback } from 'react';

import ThreadMetricsBadge from './ThreadMetricsUnreadBadge';
import { useToggleFollowingThreadMutation } from '../../../views/room/contextualBar/Threads/hooks/useToggleFollowingThreadMutation';

export type ThreadMetricsFollowProps = {
	following: boolean;
	mid: IMessage['_id'];
	rid: IMessage['rid'];
	unread: boolean;
	mention: boolean;
	all: boolean;
};

const ThreadMetricsFollow = ({ following, mid, rid, unread, mention, all }: ThreadMetricsFollowProps) => {
    /* Implementation Hidden */
};

export default ThreadMetricsFollow;

```