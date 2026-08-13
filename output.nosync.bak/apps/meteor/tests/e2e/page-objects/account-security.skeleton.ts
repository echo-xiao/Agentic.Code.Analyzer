## File: apps/meteor/tests/e2e/page-objects/account-security.ts

```typescript
import type { Locator, Page } from '@playwright/test';

import { Account } from './account';
import { EnterPasswordModal } from './fragments/modals';

export class AccountSecurity extends Account {
	private readonly enterPasswordModal: EnterPasswordModal;

	constructor(page: Page) {
        /* Implementation Hidden */
    }

	goto() {
        /* Implementation Hidden */
    }

	async waitForSecurityPage() {
        /* Implementation Hidden */
    }

	get inputNewPassword() {
		return this.page.getByRole('textbox', { name: 'New password' });
	}

	private get inputConfirmPassword() {
		return this.page.getByRole('textbox', { name: 'Confirm password' });
	}

	private get btnExpandE2EESection() {
		return this.page.getByRole('button', { name: 'End-to-end encryption' });
	}

	private get btnResetE2EEPassword() {
		return this.page.getByRole('button', { name: 'Reset E2EE password' });
	}

	private get inputNewE2EEPassword() {
		return this.page.getByRole('textbox', { name: 'New E2EE password' });
	}

	private get inputConfirmNewE2EEPassword() {
		return this.page.getByRole('textbox', { name: 'Confirm new E2EE password' });
	}

	get securityHeader(): Locator {
		return this.page.getByRole('main').getByRole('heading', { level: 1, name: 'Security', exact: true });
	}

	get securityPasswordSection(): Locator {
		return this.page.locator('[role="button"]:has-text("Password")');
	}

	get security2FASection(): Locator {
		return this.page.locator('[role="button"]:has-text("Two Factor Authentication")');
	}

	get securityE2EEncryptionSection(): Locator {
		return this.page.locator('[role="button"]:has-text("End-to-end encryption")');
	}

	get securityE2EEncryptionResetKeyButton(): Locator {
		return this.page.locator("role=button[name='Reset E2EE password']");
	}

	get securityE2EEncryptionSavePasswordButton(): Locator {
		return this.page.locator("role=button[name='Save changes']");
	}

	get email2FASwitch(): Locator {
		return this.page.locator('label', { has: this.page.getByRole('checkbox', { name: 'Two-factor authentication via email' }) });
	}

	get totp2FASwitch(): Locator {
		return this.page.locator('label', { has: this.page.getByRole('checkbox', { name: 'Two-factor authentication via TOTP' }) });
	}

	get required2faModalSetUpButton(): Locator {
		return this.page.locator('dialog >> button');
	}

	async changePassword(newPassword: string, confirmPassword: string, currentPassword: string) {
        /* Implementation Hidden */
    }

	async resetE2EEPassword() {
        /* Implementation Hidden */
    }

	async setE2EEPassword(newPassword: string) {
        /* Implementation Hidden */
    }

	async close() {
        /* Implementation Hidden */
    }
}

```