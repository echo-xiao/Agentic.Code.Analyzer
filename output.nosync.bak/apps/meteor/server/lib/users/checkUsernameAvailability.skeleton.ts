## File: apps/meteor/server/lib/users/checkUsernameAvailability.ts

```typescript
import { Team } from '@rocket.chat/core-services';
import { Users } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import { settings } from '../../../app/settings/server';
import { validateName } from '../shared/validateName';

let usernameBlackList: RegExp[] = [];

const toRegExp = (username: string): RegExp => new RegExp(`^${escapeRegExp(username).trim()}$`, 'i');

settings.watch('Accounts_BlockedUsernameList', (value: string) => {
	usernameBlackList = ['all', 'here'].concat(value.split(',')).map(toRegExp);
});

const usernameIsBlocked = (username: string, usernameBlackList: RegExp[]): boolean | number =>
	usernameBlackList.length && usernameBlackList.some((restrictedUsername) => restrictedUsername.test(escapeRegExp(username).trim()));

export const checkUsernameAvailabilityWithValidation = async function (userId: string, username: string): Promise<boolean> {
    /* Implementation Hidden */
};

export const checkUsernameAvailability = async function (username: string): Promise<boolean> {
    /* Implementation Hidden */
};

```