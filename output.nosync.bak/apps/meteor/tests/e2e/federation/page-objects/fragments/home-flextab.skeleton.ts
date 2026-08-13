## File: apps/meteor/tests/e2e/federation/page-objects/fragments/home-flextab.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FederationHomeFlextabChannels } from './home-flextab-channels';
import { FederationHomeFlextabDirectMessageMember } from './home-flextab-dm-member';
import { FederationHomeFlextabMembers } from './home-flextab-members';
import { FederationHomeFlextabNotificationPreferences } from './home-flextab-notificationPreferences';
import { FederationHomeFlextabRoom } from './home-flextab-room';

export class FederationHomeFlextab {
	private readonly page: Page;

	readonly members: FederationHomeFlextabMembers;

	readonly dmUserMember: FederationHomeFlextabDirectMessageMember;

	readonly room: FederationHomeFlextabRoom;

	readonly channels: FederationHomeFlextabChannels;

	readonly notificationPreferences: FederationHomeFlextabNotificationPreferences;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnAddExistingChannelToTeam(): Locator {
		return this.page.locator('role=button[name="Add Existing"]');
	}

	async searchForChannelOnAddChannelToTeam(channelName: string): Promise<void> {
        /* Implementation Hidden */
    }

	get userInfoUsername(): Locator {
		return this.page.locator('[data-qa="UserInfoUserName"]');
	}
}

```