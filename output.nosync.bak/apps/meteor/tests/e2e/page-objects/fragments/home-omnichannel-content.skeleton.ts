## File: apps/meteor/tests/e2e/page-objects/fragments/home-omnichannel-content.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { HomeContent } from './home-content';
import { OmnichannelTransferChatModal, OmnichannelReturnToQueueModal } from './modals';

export class HomeOmnichannelContent extends HomeContent {
	readonly forwardChatModal: OmnichannelTransferChatModal;

	readonly returnToQueueModal: OmnichannelReturnToQueueModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnReturnToQueue(): Locator {
		return this.page.locator('role=button[name="Move to the queue"]');
	}

	get btnTakeChat(): Locator {
		return this.page.locator('role=button[name="Take it!"]');
	}

	get header(): Locator {
		return this.page.locator('header');
	}

	get btnReturn(): Locator {
		return this.header.getByRole('button', { name: 'Back' });
	}

	get btnResume(): Locator {
		return this.page.locator('role=button[name="Resume"]');
	}

	get infoHeaderName(): Locator {
		return this.page.locator('.rcx-room-header').getByRole('heading');
	}

	async selectCannedResponse(cannedResponseName: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```