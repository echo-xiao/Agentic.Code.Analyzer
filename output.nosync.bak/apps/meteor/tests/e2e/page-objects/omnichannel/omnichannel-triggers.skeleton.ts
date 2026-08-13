## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-triggers.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { FlexTab } from '../fragments/flextabs/flextab';
import { Listbox } from '../fragments/listbox';
import { Table } from '../fragments/table';

type TriggerConditions = 'Visitor page URL' | 'Visitor time on site' | 'Chat opened by the visitor' | 'After guest registration';

class OmnichannelEditTriggerFlexTab extends FlexTab {
	readonly listbox: Listbox;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get inputDescription(): Locator {
		return this.root.getByRole('textbox', { name: 'Description', exact: true });
	}

	private get conditionLabel(): Locator {
		return this.root.getByText('Condition', { exact: true });
	}

	private get senderLabel(): Locator {
		return this.root.getByText('Sender', { exact: true });
	}

	private async selectCondition(condition: string) {
        /* Implementation Hidden */
    }

	private async selectSender(sender: 'queue' | 'custom') {
        /* Implementation Hidden */
    }

	private get inputAgentName(): Locator {
		return this.root.locator('input[name="actions.0.params.name"]');
	}

	private get inputConditionValue(): Locator {
		return this.root.locator('input[name="conditions.0.value"]');
	}

	private get inputTriggerMessage(): Locator {
		return this.root.locator('textarea[name="actions.0.params.msg"]');
	}

	async fillTriggerForm(
		data: Partial<{
			name: string;
			description: string;
			condition: TriggerConditions;
			conditionValue?: string | number;
			sender: 'queue' | 'custom';
			agentName?: string;
			triggerMessage: string;
		}>,
	) {
        /* Implementation Hidden */
    }
}

class OmnichannelTriggersTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelTriggers extends OmnichannelAdmin {
	readonly editTrigger: OmnichannelEditTriggerFlexTab;

	readonly table: OmnichannelTriggersTable;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	async removeTrigger(name: string) {
        /* Implementation Hidden */
    }

	public async createTrigger(triggersName: string, triggerMessage: string, condition: TriggerConditions, conditionValue?: number | string) {
        /* Implementation Hidden */
    }

	public async updateTrigger(name: string, triggerMessage: string, condition: TriggerConditions = 'Chat opened by the visitor') {
        /* Implementation Hidden */
    }
}

```