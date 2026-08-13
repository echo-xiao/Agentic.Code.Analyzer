## File: apps/meteor/tests/e2e/page-objects/encrypted-room.ts

```typescript
import type { Page } from '@playwright/test';

import { EncryptedRoomToolbar, HomeContent } from './fragments';
import { Message } from './fragments/message';
import { DisableRoomEncryptionModal, EnableRoomEncryptionModal } from './fragments/modals';

export class EncryptedRoomPage extends HomeContent {
	readonly toolbar: EncryptedRoomToolbar;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get encryptedTitle() {
		return this.page.getByRole('button', { name: '- encrypted' });
	}

	get encryptionNotReadyIndicator() {
		return this.page.getByText("You're sending an unencrypted message");
	}

	get lastMessage() {
		return new Message(this.lastUserMessage);
	}

	lastNthMessage(index: number) {
        /* Implementation Hidden */
    }

	async enableEncryption() {
        /* Implementation Hidden */
    }

	async disableEncryption() {
        /* Implementation Hidden */
    }

	async showExportMessagesTab() {
        /* Implementation Hidden */
    }
}

```