## File: apps/meteor/tests/e2e/page-objects/fragments/popup.ts

```typescript
import type { Locator } from 'playwright-core';

import { expect } from '../../utils/test';

export abstract class Popup {
	constructor(protected root: Locator) {
        /* Implementation Hidden */
    }

	waitForDisplay() {
        /* Implementation Hidden */
    }

	waitForDismissal() {
        /* Implementation Hidden */
    }
}

```