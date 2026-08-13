## File: apps/meteor/tests/e2e/page-objects/home-team.ts

```typescript
import type { Page } from '@playwright/test';

import { EditTeamFlexTab, TeamInfoFlexTab, TeamToolbar } from './fragments';
import { HomeChannel } from './home-channel';

export class HomeTeam extends HomeChannel {
	readonly headerToolbar: TeamToolbar;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	override get tabs() {
		return {
			...super.tabs,
			room: new TeamInfoFlexTab(this.page),
			editRoom: new EditTeamFlexTab(this.page),
		};
	}
}

```