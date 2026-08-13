## File: apps/meteor/client/components/dashboards/usePeriodLabel.ts

```typescript
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { Period } from './periods';
import { getPeriod } from './periods';

export const usePeriodLabel = (period: Period['key']): string => {
    /* Implementation Hidden */
};

```