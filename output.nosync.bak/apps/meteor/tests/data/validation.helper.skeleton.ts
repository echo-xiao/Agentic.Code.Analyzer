## File: apps/meteor/tests/data/validation.helper.ts

```typescript
import { expect } from 'chai';

import type { request } from './api-data';

export function expectInvalidParams(res: Awaited<ReturnType<(typeof request)['post']>>, expectedErrors: string[]): void {
    /* Implementation Hidden */
}

```