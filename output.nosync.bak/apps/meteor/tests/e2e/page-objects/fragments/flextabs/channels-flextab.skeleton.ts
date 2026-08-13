## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/channels-flextab.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FlexTab } from './flextab';
import { Listbox } from '../listbox';
import { ConfirmDeleteRoomModal, ConfirmRemoveModal } from '../modals';
import { Modal } from '../modals/modal';

class AddExistingChannelModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputChannels(): Locator {
		return this.root.getByRole('textbox');
	}

	get btnAdd(): Locator {
		return this.root.getByRole('button', { name: 'Add', exact: true });
	}

	async confirmAdd() {
        /* Implementation Hidden */
    }
}

export class ChannelsFlexTab extends FlexTab {
	readonly confirmRemoveModal: ConfirmRemoveModal;

	readonly confirmDeleteModal: ConfirmDeleteRoomModal;

	readonly addExistingChannelModal: AddExistingChannelModal;

	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnAddExisting(): Locator {
		return this.root.getByRole('button', { name: 'Add Existing', exact: true });
	}

	get btnCreateNew(): Locator {
		return this.root.getByRole('button', { name: 'Create new', exact: true });
	}

	get channelsList(): Locator {
		return this.root.getByRole('list');
	}

	getListboxOption(name: string): Locator {
        /* Implementation Hidden */
    }

	channelOption(name: string) {
        /* Implementation Hidden */
    }

	async openChannelOptionMoreActions(name: string) {
        /* Implementation Hidden */
    }

	async confirmRemoveChannel() {
        /* Implementation Hidden */
    }

	async confirmDeleteRoom() {
        /* Implementation Hidden */
    }

	async addExistingChannel(name: string) {
        /* Implementation Hidden */
    }
}

```