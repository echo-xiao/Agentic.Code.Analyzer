## File: ee/packages/federation-matrix/src/helpers/validateFederatedUsername.ts

```typescript
import { isIPv4, isIPv6 } from 'node:net';

import type { UserID } from '@rocket.chat/federation-sdk';

/** helper to validate the username format */
export function validateFederatedUsername(mxid: string): mxid is UserID {
    /* Implementation Hidden */
}

```