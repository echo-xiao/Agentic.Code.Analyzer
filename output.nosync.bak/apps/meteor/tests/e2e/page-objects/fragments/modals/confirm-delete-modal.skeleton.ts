## File: apps/meteor/tests/e2e/page-objects/fragments/modals/confirm-delete-modal.ts

```typescript
import type { Locator, Page } from 'playwright-core';

import { Modal } from './modal';

export class ConfirmDeleteModal extends Modal {
	constructor(root: Locator) {
        /* Implementation Hidden */
    }

	get btnDelete() {
		return this.root.getByRole('button', { name: 'Delete' });
	}

	async confirmDelete() {
        /* Implementation Hidden */
    }
}

export class ConfirmDeleteRoomModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get btnDelete() {
		return this.root.getByRole('button', { name: 'Yes, delete', exact: true });
	}

	async confirmDelete() {
        /* Implementation Hidden */
    }
}

export class ConfirmDeleteDepartmentModal extends ConfirmDeleteModal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get inputConfirmDepartmentName() {
		return this.root.getByRole('textbox', { name: 'Department name' });
	}

	async deleteDepartment(departmentName: string) {
        /* Implementation Hidden */
    }
}

export class ConfirmDeleteTeamModal extends Modal {
	constructor(page: Page) {
        /* Implementation Hidden */
    }

	private get btnDelete() {
		return this.root.getByRole('button', { name: 'Yes, delete', exact: true });
	}

	async confirmDelete() {
        /* Implementation Hidden */
    }
}

```