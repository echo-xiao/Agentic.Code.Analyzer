## File: apps/meteor/tests/e2e/page-objects/fragments/message.ts

```typescript
import type { Locator } from '@playwright/test';

export class Message {
	constructor(public readonly root: Locator) {
        /* Implementation Hidden */
    }

	get body() {
		return this.root.locator('[role="document"][aria-roledescription="message body"]');
	}

	getFileUploadByName(filename: string) {
        /* Implementation Hidden */
    }

	get encryptedIcon() {
		return this.root.locator('.rcx-icon--name-key');
	}
}

```