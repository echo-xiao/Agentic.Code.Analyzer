## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-reports.ts

```typescript
import type { Locator, Page } from '@playwright/test';

class OmnichannelReportsSection {
	private readonly page: Page;

	private readonly section: Locator;

	constructor(page: Page, sectionId: string) {
        /* Implementation Hidden */
    }

	get element() {
		return this.section;
	}

	get inputPeriodSelector() {
		return this.section.locator('button[aria-label="Select period"]');
	}

	get txtStateTitle() {
		return this.section.locator('.rcx-states__title');
	}

	get txtStateSubtitle() {
		return this.section.locator('.rcx-states__subtitle');
	}

	get btnRetry() {
		return this.section.locator('role=button[name="Retry"]');
	}

	get txtSummary() {
		return this.section.locator('[data-qa="report-summary"]');
	}

	findRowByName(name: string) {
        /* Implementation Hidden */
    }

	chartItem(label: string, value: number) {
        /* Implementation Hidden */
    }

	legendItem(text: string) {
        /* Implementation Hidden */
    }

	async selectPeriod(period: string) {
        /* Implementation Hidden */
    }
}

export class OmnichannelReports {
	readonly statusSection: OmnichannelReportsSection;

	readonly channelsSection: OmnichannelReportsSection;

	readonly departmentsSection: OmnichannelReportsSection;

	readonly tagsSection: OmnichannelReportsSection;

	readonly agentsSection: OmnichannelReportsSection;

	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

```