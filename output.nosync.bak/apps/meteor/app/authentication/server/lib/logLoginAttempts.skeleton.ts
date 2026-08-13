## File: apps/meteor/app/authentication/server/lib/logLoginAttempts.ts

```typescript
import { SystemLogger } from '../../../../server/lib/logger/system';
import { settings } from '../../../settings/server';
import type { ILoginAttempt } from '../ILoginAttempt';

export const logFailedLoginAttempts = (login: ILoginAttempt): void => {
    /* Implementation Hidden */
};

```