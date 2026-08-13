## File: apps/meteor/tests/e2e/page-objects/omnichannel/omnichannel-priorities.ts

```typescript
import type { Page } from '@playwright/test';

import { OmnichannelAdmin } from './omnichannel-admin';
import { ToastMessages } from '../fragments';
import { FlexTab } from '../fragments/flextabs/flextab';
import { OmnichannelResetPrioritiesModal } from '../fragments/modals';
import { Table } from '../fragments/table';

class OmnichannelEditPriorityFlexTab extends FlexTab {
	readonly toastMessage: ToastMessages;

	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

class OmnichannelPrioritiesTable extends Table {
	constructor(page: Page) {
        /* Implementation Hidden */
    }
}

export class OmnichannelPriorities extends OmnichannelAdmin {
	readonly editPriority: OmnichannelEditPriorityFlexTab;

	readonly resetPrioritiesModal: OmnichannelResetPrioritiesModal;

	readonly table: OmnichannelPrioritiesTable;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnReset() {
		return this.page.getByRole('button', { name: 'Reset' });
	}

	async resetPriorities() {
        /* Implementation Hidden */
    }

	findPriority(name: string) {
        /* Implementation Hidden */
    }
}

```