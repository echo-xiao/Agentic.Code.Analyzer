## File: apps/meteor/tests/e2e/federation/page-objects/fragments/home-sidenav.ts

```typescript
import type { Locator, Page } from '@playwright/test';

export class FederationSidenav {
	private readonly page: Page;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get checkboxFederatedChannel(): Locator {
		return this.page.locator(
			'//*[@id="modal-root"]//*[contains(@class, "rcx-field") and contains(text(), "Federated")]/../following-sibling::label/i',
		);
	}

	async countFilteredChannelsOnDirectory(name: string): Promise<number> {
        /* Implementation Hidden */
    }

	async openChatWhenHaveMultipleWithTheSameName(name: string, item: number): Promise<void> {
        /* Implementation Hidden */
    }

	async countRoomsByNameOnSearch(name: string): Promise<number> {
        /* Implementation Hidden */
    }

	async openDMMultipleChat(name: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```