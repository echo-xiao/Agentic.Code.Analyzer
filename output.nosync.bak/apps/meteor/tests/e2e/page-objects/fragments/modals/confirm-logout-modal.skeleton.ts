## File: apps/meteor/tests/e2e/page-objects/fragments/modals/confirm-logout-modal.ts

```typescript
import { Modal } from './modal';

export class ConfirmLogoutModal extends Modal {
	get btnLogout() {
		return this.root.getByRole('button', { name: 'Log out device' });
	}

	async confirmLogout() {
        /* Implementation Hidden */
    }
}

```