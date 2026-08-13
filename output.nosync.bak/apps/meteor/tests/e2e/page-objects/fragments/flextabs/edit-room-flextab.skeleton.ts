## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/edit-room-flextab.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { FlexTab } from './flextab';
import { Listbox } from '../listbox';

export class EditRoomFlexTab extends FlexTab {
	constructor(locator: Locator) {
        /* Implementation Hidden */
    }

	get inputTopic(): Locator {
		return this.root.getByRole('textbox', { name: 'Topic' });
	}

	get inputAnnouncement(): Locator {
		return this.root.getByRole('textbox', { name: 'Announcement' });
	}

	get inputDescription(): Locator {
		return this.root.getByRole('textbox', { name: 'Description' });
	}

	get checkboxReadOnly(): Locator {
		return this.root.locator('label', { hasText: 'Read-only' });
	}

	get calloutRetentionPolicy(): Locator {
		return this.root.getByRole('alert', { name: 'Retention policy warning callout' });
	}

	get advancedSettingsAccordion(): Locator {
		return this.root.getByRole('button', { name: 'Advanced settings' });
	}

	get pruneAccordion(): Locator {
		return this.root.getByRole('button', { name: 'Prune', exact: true });
	}

	getMaxAgeLabel(maxAge = '30') {
        /* Implementation Hidden */
    }

	get inputRetentionMaxAge(): Locator {
		return this.root.locator('input[name="retentionMaxAge"]');
	}

	get checkboxPruneMessages(): Locator {
		return this.root.locator('label', { hasText: 'Automatically prune old messages' });
	}

	get checkboxOverrideGlobalRetention(): Locator {
		return this.root.locator('label', { hasText: 'Override global retention policy' });
	}

	get checkboxIgnoreThreads(): Locator {
		return this.root.locator('label', { hasText: 'Do not prune Threads' });
	}

	get checkboxChannels(): Locator {
		return this.root.locator('label', { hasText: 'Channels' });
	}

	get checkboxDiscussions(): Locator {
		return this.root.locator('label', { hasText: 'Discussions' });
	}

	async toggleSidepanelItems() {
        /* Implementation Hidden */
    }
}

export class EditTeamFlexTab extends EditRoomFlexTab {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelEditRoomFlexTab extends EditRoomFlexTab {
	private readonly tagsListbox: Listbox;

	private readonly slaListbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputSLAPolicy(): Locator {
		return this.root.getByRole('button', { name: 'SLA Policy', exact: true });
	}

	optionTag(name: string): Locator {
        /* Implementation Hidden */
    }

	async selectTag(name: string) {
        /* Implementation Hidden */
    }

	async selectSLA(name: string) {
        /* Implementation Hidden */
    }

	get inputTags(): Locator {
		return this.root.getByRole('textbox', { name: 'Select an option' });
	}

	getRoomCustomField(label: string): Locator {
        /* Implementation Hidden */
    }
}

```