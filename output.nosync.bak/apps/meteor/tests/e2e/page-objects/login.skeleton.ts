## File: apps/meteor/tests/e2e/page-objects/login.ts

```typescript
import type { Page } from '@playwright/test';
import type { IUser } from '@rocket.chat/core-typings';
import { MongoClient } from 'mongodb';

import * as constants from '../config/constants';
import type { IUserState } from '../fixtures/userStates';
import { expect } from '../utils/test';

export class LoginPage {
	constructor(protected readonly page: Page) {
        /* Implementation Hidden */
    }

	get loginButton() {
		return this.page.getByRole('button', { name: 'Login', exact: true });
	}

	/**
	 * Ideally the previous action should ensure the user is logged out and we should just assume to be at the login page
	 * */
	async waitForIt() {
        /* Implementation Hidden */
    }

	protected async waitForLogin() {
        /* Implementation Hidden */
    }

	async loginByUserState(userState: IUserState, options: { except: string[] } = { except: [] }) {
        /* Implementation Hidden */
    }
}

```