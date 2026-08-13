## File: apps/meteor/tests/e2e/page-objects/fragments/toolbar.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { MenuOptions } from './menu';
import { OmnichannelCloseChatModal, OmnichannelOnHoldModal } from './modals';

export abstract class Toolbar {
	constructor(protected root: Locator) {
        /* Implementation Hidden */
    }

	click() {
        /* Implementation Hidden */
    }
}

export class RoomToolbar extends Toolbar {
	readonly menu: MenuOptions;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnRoomInfo() {
		return this.root.getByRole('button', { name: 'Room Information' });
	}

	get btnMembers() {
		return this.root.getByRole('button', { name: 'Members' });
	}

	get btnVideoCall() {
		return this.root.getByRole('button', { name: 'Video Call' });
	}

	get btnVoiceCall() {
		return this.root.getByRole('button', { name: 'Voice call' });
	}

	get btnUserInfo(): Locator {
		return this.root.getByRole('button', { name: 'User Info' });
	}

	get btnDiscussion(): Locator {
		return this.root.getByRole('button', { name: 'Discussions' });
	}

	get btnThreads(): Locator {
		return this.root.getByRole('button', { name: 'Threads' });
	}

	get btnFiles(): Locator {
		return this.root.getByRole('button', { name: 'Files' });
	}

	get btnMoreOptions(): Locator {
		return this.root.getByRole('button', { name: 'Options' });
	}

	get btnSearchMessages(): Locator {
		return this.root.getByRole('button', { name: 'Search Messages' });
	}

	get btnDisableE2EEncryption(): Locator {
		return this.root.getByRole('button', { name: 'Disable E2E encryption' });
	}

	get menuItemExportMessages(): Locator {
		return this.menu.getMenuItem('Export messages');
	}

	get menuItemMentions(): Locator {
		return this.menu.getMenuItem('Mentions');
	}

	get menuItemStarredMessages(): Locator {
		return this.menu.getMenuItem('Starred Messages');
	}

	get menuItemPinnedMessages(): Locator {
		return this.menu.getMenuItem('Pinned Messages');
	}

	get menuItemPruneMessages(): Locator {
		return this.menu.getMenuItem('Prune Messages');
	}

	get menuItemNotificationsPreferences(): Locator {
		return this.menu.getMenuItem('Notifications Preferences');
	}

	get menuItemDisableE2EEncryption(): Locator {
		return this.menu.getMenuItem('Disable E2E encryption');
	}

	get menuItemEnableE2EEncryption(): Locator {
		return this.menu.getMenuItem('Enable E2E encryption');
	}

	get menuItemFiles(): Locator {
		return this.menu.getMenuItem('Files');
	}

	async openRoomInfo() {
        /* Implementation Hidden */
    }

	async openMembersTab() {
        /* Implementation Hidden */
    }

	async openUserInfo() {
        /* Implementation Hidden */
    }

	async openMoreOptions() {
        /* Implementation Hidden */
    }

	private get btnTeamChannels(): Locator {
		return this.root.getByRole('button', { name: 'Team Channels' });
	}

	async openTeamChannels() {
        /* Implementation Hidden */
    }

	async waitFor() {
        /* Implementation Hidden */
    }
}

export class TeamToolbar extends RoomToolbar {
	private get menuItemTeamMembers() {
		return this.menu.getMenuItem('Teams Members');
	}

	private get btnTeamInfo() {
		return this.root.getByRole('button', { name: 'Team info' });
	}

	async openTeamMembers() {
        /* Implementation Hidden */
    }

	async openTeamInfo() {
        /* Implementation Hidden */
    }
}

export class EncryptedRoomToolbar extends RoomToolbar {}

export class OmnichannelRoomToolbar extends RoomToolbar {
	private get btnContactInfo(): Locator {
		return this.root.getByRole('button', { name: 'Contact Information' });
	}

	private get btnCannedResponses(): Locator {
		return this.root.getByRole('button', { name: 'Canned Responses' });
	}

	async openContactInfo() {
        /* Implementation Hidden */
    }

	async openCannedResponses() {
        /* Implementation Hidden */
    }
}

export class OmnichannelQuickActionsRoomToolbar extends Toolbar {
	private closeChatModal: OmnichannelCloseChatModal;

	private onHoldModal: OmnichannelOnHoldModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnOnHold(): Locator {
		return this.root.getByRole('button', { name: 'Place chat On-Hold' });
	}

	get btnForwardChat(): Locator {
		return this.root.getByRole('button', { name: 'Forward chat' });
	}

	get btnEndConversation(): Locator {
		return this.root.getByRole('button', { name: 'End conversation' });
	}

	/**
	 * FIXME: This `clickCount` seems a hack for a bad implementation
	 */
	async placeChatOnHold() {
        /* Implementation Hidden */
    }

	async forwardChat() {
        /* Implementation Hidden */
    }

	async closeChat({ comment = 'any_comment', downloadPDF = false } = {}): Promise<void> {
        /* Implementation Hidden */
    }
}

```