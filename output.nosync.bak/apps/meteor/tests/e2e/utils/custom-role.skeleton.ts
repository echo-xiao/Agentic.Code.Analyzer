## File: apps/meteor/tests/e2e/utils/custom-role.ts

```typescript
import type { Endpoints } from '@rocket.chat/rest-typings';

import type { BaseTest } from './test';

export async function createCustomRole(api: BaseTest['api'], data: Parameters<Endpoints['/v1/roles.create']['POST']>[0]) {
    /* Implementation Hidden */
}

export async function deleteCustomRole(api: BaseTest['api'], roleId: string) {
    /* Implementation Hidden */
}

```