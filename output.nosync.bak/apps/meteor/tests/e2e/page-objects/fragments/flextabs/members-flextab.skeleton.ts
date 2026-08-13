## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/members-flextab.ts

```typescript
import type { Page } from '@playwright/test';

import { FlexTab } from './flextab';
import { Listbox } from '../listbox';
import { MenuMore } from '../menu';
import { ConfirmRemoveModal } from '../modals';
import { UserInfoFlexTab } from './user-info-flextab';
import { Modal } from '../modals/modal';

export class ConfirmMuteModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get btnMute() {
		return this.root.getByRole('button', { name: 'Yes, mute user!' });
	}

	async confirmMute() {
        /* Implementation Hidden */
    }
}

export class RemoveTeamMemberModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get description() {
		return this.root.getByText('Select the channels you want the user to be removed from');
	}

	channel(channelName: string) {
        /* Implementation Hidden */
    }

	channelCheckbox(channelName: string) {
        /* Implementation Hidden */
    }

	async selectChannel(channelName: string) {
        /* Implementation Hidden */
    }

	private get btnContinue() {
		return this.root.getByRole('button', { name: 'Continue' });
	}

	async continue() {
        /* Implementation Hidden */
    }
}

class AddUsersFlexTab extends FlexTab {
	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private btnAddUsers() {
        /* Implementation Hidden */
    }

	async addUser(username: string) {
        /* Implementation Hidden */
    }
}

export class MembersFlexTab extends FlexTab {
	readonly listbox: Listbox;

	readonly removeModal: ConfirmRemoveModal;

	readonly removeTeamMemberModal: RemoveTeamMemberModal;

	readonly menu: MenuMore;

	readonly confirmMuteModal: ConfirmMuteModal;

	readonly addUsersFlexTab: AddUsersFlexTab;

	readonly userInfo: UserInfoFlexTab;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	memberOption(username: string) {
        /* Implementation Hidden */
    }

	getMenuItemAction(action: string) {
        /* Implementation Hidden */
    }

	async openMemberInfo(username: string) {
        /* Implementation Hidden */
    }

	async openMoreActions() {
        /* Implementation Hidden */
    }

	async openMemberOptionMoreActions(username: string) {
        /* Implementation Hidden */
    }

	async addUser(username: string) {
        /* Implementation Hidden */
    }

	private get btnInviteLink() {
		return this.root.getByRole('button', { name: 'Invite Link' });
	}

	async inviteUser() {
        /* Implementation Hidden */
    }

	async muteUser(username: string) {
        /* Implementation Hidden */
    }

	async unmuteUser(username: string) {
        /* Implementation Hidden */
    }

	async setUserAsModerator(username: string) {
        /* Implementation Hidden */
    }

	async setUserAsOwner(username: string) {
        /* Implementation Hidden */
    }

	async showAllUsers() {
        /* Implementation Hidden */
    }

	private async ignoreUserAction(action: string, username: string) {
        /* Implementation Hidden */
    }

	async ignoreUser(username: string) {
        /* Implementation Hidden */
    }

	async unignoreUser(username: string) {
        /* Implementation Hidden */
    }

	async confirmRemoveUser() {
        /* Implementation Hidden */
    }
}

```