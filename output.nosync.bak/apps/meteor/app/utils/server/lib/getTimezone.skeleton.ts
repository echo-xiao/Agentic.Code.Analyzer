## File: apps/meteor/app/utils/server/lib/getTimezone.ts

```typescript
import moment from 'moment-timezone';

import { settings } from '../../../settings/server';

const padOffset = (offset: string | number): string => {
    /* Implementation Hidden */
};

const guessTimezoneFromOffset = (offset?: string | number): string => {
    /* Implementation Hidden */
};

export const getTimezone = (user?: { utcOffset?: string | number } | null): string => {
    /* Implementation Hidden */
};

```