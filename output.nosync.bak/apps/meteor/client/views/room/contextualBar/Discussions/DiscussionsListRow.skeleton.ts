## File: apps/meteor/client/views/room/contextualBar/Discussions/DiscussionsListRow.tsx

```typescript
import type { IDiscussionMessage } from '@rocket.chat/core-typings';
import type { MouseEvent } from 'react';
import { memo } from 'react';

import DiscussionsListItem from './components/DiscussionsListItem';
import { useTimeAgo } from '../../../../hooks/useTimeAgo';
import { normalizeThreadMessage } from '../../../../lib/normalizeThreadMessage';

type DiscussionListRowProps = {
	discussion: IDiscussionMessage;
	showRealNames: boolean;
	onClick: (e: MouseEvent<HTMLElement>) => void;
};

function DiscussionListRow({ discussion, showRealNames, onClick }: DiscussionListRowProps) {
    /* Implementation Hidden */
}

export default memo(DiscussionListRow);

```