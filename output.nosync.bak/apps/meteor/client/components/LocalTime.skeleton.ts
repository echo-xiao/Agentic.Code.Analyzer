## File: apps/meteor/client/components/LocalTime.tsx

```typescript
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUTCClock } from '../hooks/useUTCClock';

export type LocalTimeProps = {
	utcOffset: number;
};

const LocalTime = ({ utcOffset }: LocalTimeProps) => {
    /* Implementation Hidden */
};

export default memo(LocalTime);

```