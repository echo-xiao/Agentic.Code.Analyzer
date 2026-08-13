## File: apps/meteor/server/lib/compareUserPasswordHistory.ts

```typescript
import type { IUser, IPassword } from '@rocket.chat/core-typings';
import { Accounts } from 'meteor/accounts-base';
import type { Meteor } from 'meteor/meteor';

import { settings } from '../../app/settings/server';

/**
 * Check if a given password is the one user by given user or if the user doesn't have a password
 * @param {object} user User object
 * @param {object} pass Object with { plain: 'plain-test-password' } or { sha256: 'sha256password' }
 */
export async function compareUserPasswordHistory(user: IUser, pass: IPassword): Promise<boolean> {
    /* Implementation Hidden */
}

```