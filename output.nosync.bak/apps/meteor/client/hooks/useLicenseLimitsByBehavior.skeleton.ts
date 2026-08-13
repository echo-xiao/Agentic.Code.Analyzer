## File: apps/meteor/client/hooks/useLicenseLimitsByBehavior.ts

```typescript
import type { LicenseBehavior, LicenseLimitKind } from '@rocket.chat/core-typings';
import { validateWarnLimit } from '@rocket.chat/license/src/validation/validateLimit';
import { useLicense } from '@rocket.chat/ui-client';

type LicenseLimitsByBehavior = Record<LicenseBehavior, LicenseLimitKind[]>;

export const useLicenseLimitsByBehavior = () => {
    /* Implementation Hidden */
};

```