## File: apps/meteor/client/components/UTCClock.tsx

```typescript
import { memo } from 'react';

import { useUTCClock } from '../hooks/useUTCClock';

export type UTCClockProps = {
	utcOffset: number;
};

const UTCClock = ({ utcOffset }: UTCClockProps) => {
    /* Implementation Hidden */
};

export default memo(UTCClock);

```