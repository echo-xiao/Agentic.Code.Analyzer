## File: apps/meteor/tests/e2e/page-objects/home-omnichannel.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { HomeOmnichannelContent, OmnichannelQuickActionsRoomToolbar, OmnichannelRoomToolbar, OmnichannelSidebar } from './fragments';
import { OmnichannelEditRoomFlexTab } from './fragments/flextabs';
import { OmnichannelRoomInfoFlexTab } from './fragments/flextabs/room-info-flextab';
import { HomeChannel } from './home-channel';
import {
	OmnichannelCannedResponses,
	OmnichannelTranscript,
	OmnichannelContactCenterContacts,
	OmnichannelContactCenterChats,
} from './omnichannel';

export class HomeOmnichannel extends HomeChannel {
	readonly omnisidenav: OmnichannelSidebar;

	readonly transcript: OmnichannelTranscript;

	readonly cannedResponses: OmnichannelCannedResponses;

	readonly contacts: OmnichannelContactCenterContacts;

	readonly chats: OmnichannelContactCenterChats;

	readonly roomInfo: OmnichannelRoomInfoFlexTab;

	readonly editRoomInfo: OmnichannelEditRoomFlexTab;

	readonly quickActionsRoomToolbar: OmnichannelQuickActionsRoomToolbar;

	override readonly content: HomeOmnichannelContent;

	override readonly roomToolbar: OmnichannelRoomToolbar;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnContactInfo(): Locator {
		return this.page.getByRole('button', { name: 'Contact Information' });
	}
}

```