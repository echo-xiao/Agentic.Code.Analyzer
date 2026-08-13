## File: apps/meteor/tests/e2e/page-objects/fragments/navbar.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { EditStatusModal, CreateNewChannelModal, CreateNewDiscussionModal, CreateNewDMModal, CreateNewTeamModal } from './modals';
import { expect } from '../../utils/test';

export class Navbar {
	private readonly modals: {
		'Channel': CreateNewChannelModal;
		'Team': CreateNewTeamModal;
		'Discussion': CreateNewDiscussionModal;
		'Direct message': CreateNewDMModal;
		'editStatus': EditStatusModal;
	};

	constructor(private readonly root: Page) {
        /* Implementation Hidden */
    }

	get btnVoiceAndOmnichannel(): Locator {
		return this.root.getByRole('button', { name: 'Voice and omnichannel' });
	}

	get groupHistoryNavigation(): Locator {
		return this.root.getByRole('group', { name: 'History navigation' });
	}

	get pagesGroup(): Locator {
		return this.root.getByRole('group', { name: 'Pages and actions' });
	}

	get omnichannelGroup(): Locator {
		return this.root.getByRole('group', { name: 'Omnichannel' });
	}

	get btnContactCenter(): Locator {
		return this.omnichannelGroup.getByRole('button', { name: 'Contact Center' });
	}

	get voiceCallGroup(): Locator {
		return this.root.getByRole('group', { name: 'Voice call' });
	}

	get btnNewVoiceCall(): Locator {
		return this.voiceCallGroup.getByRole('button', { name: 'New voice call' });
	}

	get btnSwitchOmnichannelStatus(): Locator {
		return this.omnichannelGroup.getByRole('button', { name: 'answer chats' });
	}

	get btnHome(): Locator {
		return this.pagesGroup.getByRole('button', { name: 'Home' });
	}

	get btnDirectory(): Locator {
		return this.pagesGroup.getByRole('button', { name: 'Directory' });
	}

	get btnMarketplace(): Locator {
		return this.pagesGroup.getByRole('button', { name: 'Marketplace' });
	}

	get btnMenuPages(): Locator {
		return this.pagesGroup.getByRole('button', { name: 'Pages' });
	}

	get btnDisplay(): Locator {
		return this.pagesGroup.getByRole('button', { name: 'Display' });
	}

	get menuDisplay(): Locator {
		return this.root.getByRole('menu', { name: 'Display' });
	}

	get groupDisplay(): Locator {
		return this.menuDisplay.getByRole('group', { name: 'Display' });
	}

	getDisplayMenuItem(mode: 'Extended' | 'Medium' | 'Condensed' | 'Avatars'): Locator {
        /* Implementation Hidden */
    }

	get groupSortBy(): Locator {
		return this.menuDisplay.getByRole('group', { name: 'Sort by' });
	}

	getSortMenuItem(mode: 'Activity' | 'Name'): Locator {
        /* Implementation Hidden */
    }

	get groupGroupBy(): Locator {
		return this.menuDisplay.getByRole('group', { name: 'Group by' });
	}

	getGroupByMenuItem(mode: 'Unread' | 'Favorites' | 'Types'): Locator {
        /* Implementation Hidden */
    }

	get btnCreateNew(): Locator {
		return this.pagesGroup.getByRole('button', { name: 'Create new' });
	}

	get createNewMenu(): Locator {
		return this.root.getByRole('menu', { name: 'Create new' });
	}

	get navbarSearchSection(): Locator {
		return this.root.getByRole('search');
	}

	get searchInput(): Locator {
		return this.navbarSearchSection.getByRole('combobox');
	}

	get searchList(): Locator {
		return this.navbarSearchSection.getByRole('listbox', { name: 'Channels' });
	}

	get workspaceGroup(): Locator {
		return this.root.getByRole('group', { name: 'Workspace and user preferences' });
	}

	get btnManageWorkspace(): Locator {
		return this.workspaceGroup.getByRole('button', { name: 'Manage' });
	}

	async openManageMenuItem(name: 'Workspace' | 'Omnichannel'): Promise<void> {
        /* Implementation Hidden */
    }

	get btnUserMenu(): Locator {
		return this.workspaceGroup.getByRole('button', { name: 'User menu' });
	}

	get userMenu(): Locator {
		return this.root.getByRole('menu', { name: 'User menu' });
	}

	get btnLogout(): Locator {
		return this.userMenu.getByRole('menuitemcheckbox', { name: 'Logout' });
	}

	get btnCustomStatus(): Locator {
		return this.userMenu.getByRole('menuitemcheckbox', { name: 'Custom...' });
	}

	getUserProfileMenuOption(name: string): Locator {
        /* Implementation Hidden */
    }

	createNewMenuItem(name: 'Direct message' | 'Discussion' | 'Channel' | 'Team' | 'Outbound message'): Locator {
        /* Implementation Hidden */
    }

	async openCreate(name: 'Direct message' | 'Discussion' | 'Channel' | 'Team'): Promise<void> {
        /* Implementation Hidden */
    }

	async logout(): Promise<void> {
        /* Implementation Hidden */
    }

	btnSidebarToggler(closeSidebar?: boolean): Locator {
        /* Implementation Hidden */
    }

	async openAdminPanel(): Promise<void> {
        /* Implementation Hidden */
    }

	async typeSearch(name: string): Promise<void> {
        /* Implementation Hidden */
    }

	async waitForChannel(): Promise<void> {
        /* Implementation Hidden */
    }

	getSearchRoomByName(name: string): Locator {
        /* Implementation Hidden */
    }

	getSearchItemBadge(name: string): Locator {
        /* Implementation Hidden */
    }

	async openChat(name: string): Promise<void> {
        /* Implementation Hidden */
    }

	async setDisplayMode(mode: 'Extended' | 'Medium' | 'Condensed'): Promise<void> {
        /* Implementation Hidden */
    }

	async createNew(
		type: 'Channel' | 'Team',
		name: string,
		options?: { private?: boolean; encrypted?: boolean; readOnly?: boolean; federated?: boolean; members?: string[] },
	): Promise<void> {
        /* Implementation Hidden */
    }

	async createNewDM(username: string): Promise<void> {
        /* Implementation Hidden */
    }

	async createNewDiscussion(parentRoom: string, name: string, message?: string): Promise<void> {
        /* Implementation Hidden */
    }

	async createEncryptedChannel(name: string): Promise<void> {
        /* Implementation Hidden */
    }

	async changeUserStatus(status: 'online' | 'away' | 'busy' | 'invisible' | 'offline' | string): Promise<void> {
        /* Implementation Hidden */
    }

	async changeUserCustomStatus(text?: string): Promise<void> {
        /* Implementation Hidden */
    }

	get editStatusModal(): EditStatusModal {
		return this.modals.editStatus;
	}

	async openEditStatusModal(): Promise<void> {
        /* Implementation Hidden */
    }

	async changeUserCustomStatusWithExpiration(options: {
		message?: string;
		statusType?: string;
		duration: string;
		customDate?: string;
		customTime?: string;
	}): Promise<void> {
        /* Implementation Hidden */
    }

	async switchOmnichannelStatus(status: 'offline' | 'online') {
        /* Implementation Hidden */
    }

	getUserStatusBadge(status: 'online' | 'away' | 'busy' | 'offline'): Locator {
        /* Implementation Hidden */
    }
}

```