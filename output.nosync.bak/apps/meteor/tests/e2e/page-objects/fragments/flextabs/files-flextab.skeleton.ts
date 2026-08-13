## File: apps/meteor/tests/e2e/page-objects/fragments/flextabs/files-flextab.ts

```typescript
import type { Page } from '@playwright/test';

import { FlexTab } from './flextab';
import { MenuMore } from '../menu';
import { ConfirmDeleteModal } from '../modals';

export class FilesFlexTab extends FlexTab {
	readonly menu: MenuMore;

	readonly confirmDeleteModal: ConfirmDeleteModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	get fileList() {
		return this.root.getByRole('list', { name: 'Files list' });
	}

	getFileByName(name: string) {
        /* Implementation Hidden */
    }

	async deleteFile(name: string) {
        /* Implementation Hidden */
    }
}

```