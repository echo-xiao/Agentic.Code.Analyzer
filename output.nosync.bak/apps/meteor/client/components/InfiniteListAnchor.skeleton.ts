## File: apps/meteor/client/components/InfiniteListAnchor.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useEffect, useRef } from 'react';

export type InfiniteListAnchorProps = {
	loadMore: () => void;
} & ComponentProps<typeof Box>;

const InfiniteListAnchor = ({ loadMore, ...props }: InfiniteListAnchorProps) => {
    /* Implementation Hidden */
};

export default InfiniteListAnchor;

```