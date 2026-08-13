## File: apps/meteor/tests/e2e/fixtures/responses/mediaResponse.ts

```typescript
import type { Page, Response } from '@playwright/test';

const isMediaResponse = (response: Response) =>
	/api\/v1\/rooms\.media(?:\/|\?|$)/.test(response.url()) && response.request().method() === 'POST';

export const createMediaResponsePromise = (page: Page) => {
    /* Implementation Hidden */
};

```