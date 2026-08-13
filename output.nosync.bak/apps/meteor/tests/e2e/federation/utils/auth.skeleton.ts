## File: apps/meteor/tests/e2e/federation/utils/auth.ts

```typescript
import type { Page } from '@playwright/test';

export const doLogin = async ({
	page,
	server,
	storageNamePrefix,
	storeState,
}: {
	page: Page;
	server: {
		username: string;
		password: string;
		url: string;
	};
	storageNamePrefix?: string;
	storeState?: boolean;
}) => {
    /* Implementation Hidden */
};

```