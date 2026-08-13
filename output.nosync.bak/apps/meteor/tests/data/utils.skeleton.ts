## File: apps/meteor/tests/data/utils.ts

```typescript
import type { Credentials } from '@rocket.chat/api-client';
import type { Path } from '@rocket.chat/rest-typings';
import { expect } from 'chai';

import { api, request, type PathWithoutPrefix } from './api-data';

export function withTimeout<T>(fn: (signal: AbortSignal) => Promise<T>, ms: number): Promise<T> {
    /* Implementation Hidden */
}

export const pagination = <TPath extends PathWithoutPrefix<Path>>(
	apiEndpoint: TPath,
	credentials: Credentials,
	extraQueryParams: Record<string, any> = {},
) => {
    /* Implementation Hidden */
};

```