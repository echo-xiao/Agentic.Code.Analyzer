## File: apps/meteor/tests/e2e/utils/updatePermissions.ts

```typescript
import { expect, type BaseTest } from './test';

type PermissionUpdate = { _id: string; roles: string[] };

export const updatePermissions = async (api: BaseTest['api'], permissions: PermissionUpdate[]): Promise<void> => {
    /* Implementation Hidden */
};

```