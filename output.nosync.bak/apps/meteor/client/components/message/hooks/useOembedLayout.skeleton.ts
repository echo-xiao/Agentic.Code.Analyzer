## File: apps/meteor/client/components/message/hooks/useOembedLayout.ts

```typescript
import { useLayout } from '@rocket.chat/ui-contexts';

import { useMessageListOembedEnabled } from '../list/MessageListContext';

type OembedLayout = {
	enabled: boolean;
	maxWidth: number | '100%';
	maxHeight: number;
};

/**
 * Returns the layout parameters for oembeds
 */
export const useOembedLayout = (): OembedLayout => {
    /* Implementation Hidden */
};

```