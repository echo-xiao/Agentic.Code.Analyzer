## File: apps/meteor/tests/e2e/federation/page-objects/channel.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FederationHomeContent } from './fragments/home-content';
import { FederationHomeFlextab } from './fragments/home-flextab';
import { FederationSidenav } from './fragments/home-sidenav';
import { Navbar, RoomToolbar, ToastMessages } from '../../page-objects/fragments';
import { CreateNewChannelModal, CreateNewDMModal } from '../../page-objects/fragments/modals';

export class FederationChannel {
	private readonly page: Page;

	readonly content: FederationHomeContent;

	readonly sidenav: FederationSidenav;

	readonly navbar: Navbar;

	readonly tabs: FederationHomeFlextab;

	readonly roomToolbar: RoomToolbar;

	readonly toastMessage: ToastMessages;

	readonly newChannelModal: CreateNewChannelModal;

	readonly newDMModal: CreateNewDMModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnContextualbarClose(): Locator {
		return this.page.locator('[data-qa="ContextualbarActionClose"]');
	}

	async getFederationServerName(): Promise<string> {
        /* Implementation Hidden */
    }

	async createPublicChannelAndInviteUsersUsingCreationModal(channelName: string, usernamesToInvite: string[]) {
        /* Implementation Hidden */
    }

	async createDiscussionSearchingForChannel(channelName: string) {
        /* Implementation Hidden */
    }

	async createTeam(teamName: string) {
        /* Implementation Hidden */
    }

	async createPrivateGroupAndInviteUsersUsingCreationModal(channelName: string, usernamesToInvite: string[]) {
        /* Implementation Hidden */
    }

	async createDirectMessagesUsingModal(usernamesToInvite: string[]) {
        /* Implementation Hidden */
    }

	async createNonFederatedPublicChannelAndInviteUsersUsingCreationModal(channelName: string, usernamesToInvite: string[]) {
        /* Implementation Hidden */
    }
}

```