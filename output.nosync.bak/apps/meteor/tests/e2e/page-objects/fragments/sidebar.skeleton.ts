## File: apps/meteor/tests/e2e/page-objects/fragments/sidebar.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { expect } from '../../utils/test';

export abstract class Sidebar {
	constructor(protected root: Locator) {
        /* Implementation Hidden */
    }

	get btnClose(): Locator {
		return this.root.getByRole('button', { name: 'Close' });
	}

	waitForDismissal() {
        /* Implementation Hidden */
    }

	waitForDisplay() {
        /* Implementation Hidden */
    }
}

export class RoomSidebar extends Sidebar {
	constructor(protected page: Page) {
        /* Implementation Hidden */
    }

	get teamCollabFilters(): Locator {
		return this.root.getByRole('tablist', { name: 'Team collaboration filters' });
	}

	get omnichannelFilters(): Locator {
		return this.root.getByRole('tablist', { name: 'Omnichannel filters' });
	}

	get allTeamCollabFilter(): Locator {
		return this.teamCollabFilters.getByRole('tab', { name: 'All' });
	}

	get favoritesTeamCollabFilter(): Locator {
		return this.teamCollabFilters.getByRole('tab', { name: 'Favorites' });
	}

	get discussionsTeamCollabFilter(): Locator {
		return this.teamCollabFilters.getByRole('tab', { name: 'Discussions' });
	}

	// TODO: fix this filter, workaround due to virtuoso
	get topChannelList(): Locator {
		return this.root.getByTestId('virtuoso-top-item-list');
	}

	get channelsList(): Locator {
		// TODO: fix this filter, workaround due to virtuoso
		// return this.sidebar.getByRole('list', { name: 'Channels' }).filter({ has: this.page.getByRole('listitem') });
		return this.root.getByTestId('virtuoso-item-list');
	}

	getSidebarItemByName(name: string) {
        /* Implementation Hidden */
    }

	getFilterItemByName(name: string): Locator {
        /* Implementation Hidden */
    }

	getSidebarListItem(name: string): Locator {
        /* Implementation Hidden */
    }

	get firstCollapser(): Locator {
		return this.topChannelList.getByRole('region').first();
	}

	get teamsCollapser(): Locator {
		return this.root.getByRole('region', { name: 'Collapse Teams' }).first();
	}

	get channelsCollapser(): Locator {
		return this.channelsList.getByRole('region', { name: 'Collapse Channels' });
	}

	get directMessagesCollapser(): Locator {
		return this.channelsList.getByRole('region', { name: 'Collapse Direct messages' });
	}

	get firstChannelFromList(): Locator {
		return this.channelsList.getByRole('listitem').first();
	}

	async markItemAsUnread(item: Locator): Promise<void> {
        /* Implementation Hidden */
    }

	getCollapseGroupByName(name: string): Locator {
        /* Implementation Hidden */
    }

	getItemUnreadBadge(item: Locator): Locator {
        /* Implementation Hidden */
    }

	getBadgeIndicator(name: string, title: string): Locator {
        /* Implementation Hidden */
    }

	async selectPriority(name: string, priority: string) {
        /* Implementation Hidden */
    }

	getSidebarListItemByName(name: string): Locator {
        /* Implementation Hidden */
    }
}

export class AdminSidebar extends Sidebar {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get linkEmoji() {
		return this.root.getByRole('link', { name: 'Emoji' });
	}

	async close(): Promise<void> {
        /* Implementation Hidden */
    }
}

export class AccountSidebar extends Sidebar {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get linkSecurity(): Locator {
		return this.root.getByRole('link', { name: 'Security' });
	}

	async close(): Promise<void> {
        /* Implementation Hidden */
    }
}

export class OmnichannelSidebar extends Sidebar {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get linkDepartments(): Locator {
		return this.root.locator('a[href="/omnichannel/departments"]');
	}

	get linkAgents(): Locator {
		return this.root.locator('a[href="/omnichannel/agents"]');
	}

	get linkManagers(): Locator {
		return this.root.locator('a[href="/omnichannel/managers"]');
	}

	get linkCustomFields(): Locator {
		return this.root.locator('a[href="/omnichannel/customfields"]');
	}

	get linkCurrentChats(): Locator {
		return this.root.locator('a[href="/omnichannel/current"]');
	}

	get linkSlaPolicies(): Locator {
		return this.root.locator('a[href="/omnichannel/sla-policies"]');
	}

	get linkPriorities(): Locator {
		return this.root.locator('a[href="/omnichannel/priorities"]');
	}

	get linkMonitors(): Locator {
		return this.root.locator('a[href="/omnichannel/monitors"]');
	}

	get linkBusinessHours(): Locator {
		return this.root.locator('a[href="/omnichannel/businessHours"]');
	}

	get linkAnalytics(): Locator {
		return this.root.locator('a[href="/omnichannel/analytics"]');
	}

	get linkRealTimeMonitoring(): Locator {
		return this.root.locator('a[href="/omnichannel/realtime-monitoring"]');
	}

	get linkReports(): Locator {
		return this.root.locator('a[href="/omnichannel/reports"]');
	}

	get linkCannedResponses(): Locator {
		return this.root.locator('a[href="/omnichannel/canned-responses"]');
	}

	get linkUnits(): Locator {
		return this.root.locator('a[href="/omnichannel/units"]');
	}

	get linkLivechatAppearance(): Locator {
		return this.root.locator('a[href="/omnichannel/appearance"]');
	}

	get linkTags(): Locator {
		return this.root.locator('a[href="/omnichannel/tags"]');
	}
}

```