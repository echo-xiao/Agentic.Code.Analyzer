## File: apps/meteor/tests/e2e/federation/page-objects/fragments/admin-flextab.ts

```typescript
import type { Page } from '@playwright/test';

import { FederationAdminFlextabUsers } from './admin-flextab-users';

export class FederationAdminFlextab {
	readonly users: FederationAdminFlextabUsers;

	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

```