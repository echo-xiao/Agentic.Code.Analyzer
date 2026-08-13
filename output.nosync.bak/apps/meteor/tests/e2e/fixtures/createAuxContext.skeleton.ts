## File: apps/meteor/tests/e2e/fixtures/createAuxContext.ts

```typescript
import type { Browser, Page } from '@playwright/test';

import type { IUserState } from './userStates';

export const createAuxContext = async (
	browser: Browser,
	userState: IUserState,
	route = '/',
	waitForMainContent = true,
): Promise<{ page: Page }> => {
    /* Implementation Hidden */
};

```