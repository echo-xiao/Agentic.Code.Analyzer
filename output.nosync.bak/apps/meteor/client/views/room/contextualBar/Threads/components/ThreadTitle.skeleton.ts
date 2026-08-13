## File: apps/meteor/client/views/room/contextualBar/Threads/components/ThreadTitle.tsx

```typescript
import type { IThreadMainMessage } from '@rocket.chat/core-typings';
import { ContextualbarTitle } from '@rocket.chat/ui-client';
import { useMemo } from 'react';

import { useNormalizedThreadTitleHtml } from '../hooks/useNormalizedThreadTitleHtml';

type ThreadTitleProps = {
	mainMessage: IThreadMainMessage;
};

const ThreadTitle = ({ mainMessage }: ThreadTitleProps) => {
    /* Implementation Hidden */
};

export default ThreadTitle;

```