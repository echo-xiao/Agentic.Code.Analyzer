## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/room-info-flextab.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FlexTab } from './flextab';
import { MenuMore } from '../menu';
import { ConfirmDeleteTeamModal, ConfirmDeleteRoomModal } from '../modals';
import { Modal } from '../modals/modal';

class ConfirmLeaveRoomModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get btnLeave() {
		return this.root.getByRole('button', { name: 'Leave', exact: true });
	}

	async confirmLeave() {
        /* Implementation Hidden */
    }
}

export class RoomInfoFlexTab extends FlexTab {
	readonly menu: MenuMore;

	readonly confirmLeaveModal: ConfirmLeaveRoomModal;

	readonly confirmDeleteModal: ConfirmDeleteRoomModal;

	constructor(root: Locator) {
        /* Implementation Hidden */
    }

	get btnEdit(): Locator {
		return this.root.getByRole('button', { name: 'Edit' });
	}

	get btnLeave(): Locator {
		return this.root.getByRole('button', { name: 'Leave' });
	}

	get btnMore(): Locator {
		return this.root.getByRole('button', { name: 'More' });
	}

	get optionDelete(): Locator {
		return this.menu.getMenuItem('Delete');
	}

	async leaveRoom() {
        /* Implementation Hidden */
    }

	async deleteRoom() {
        /* Implementation Hidden */
    }
}

class ConfirmConvertIntoChannelModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get btnConvert() {
		return this.root.getByRole('button', { name: 'Convert', exact: true });
	}

	async confirmConvert() {
        /* Implementation Hidden */
    }
}

export class TeamInfoFlexTab extends RoomInfoFlexTab {
	readonly confirmDeleteTeamModal: ConfirmDeleteTeamModal;

	readonly confirmConvertIntoChannelModal: ConfirmConvertIntoChannelModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async deleteTeam() {
        /* Implementation Hidden */
    }

	async convertIntoChannel() {
        /* Implementation Hidden */
    }
}

export class OmnichannelRoomInfoFlexTab extends RoomInfoFlexTab {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	getInfo(value: string): Locator {
        /* Implementation Hidden */
    }

	getLabel(label: string): Locator {
        /* Implementation Hidden */
    }

	getInfoByLabel(label: string): Locator {
        /* Implementation Hidden */
    }

	getTagInfoByLabel(label: string): Locator {
        /* Implementation Hidden */
    }
}

```