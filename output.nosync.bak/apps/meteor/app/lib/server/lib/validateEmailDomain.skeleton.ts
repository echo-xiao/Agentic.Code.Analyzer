## File: apps/meteor/app/lib/server/lib/validateEmailDomain.js

```typescript
import dns from 'node:dns';
import util from 'node:util';

import { validateEmail } from '@rocket.chat/tools';
import { Meteor } from 'meteor/meteor';

import { emailDomainDefaultBlackList } from './defaultBlockedDomainsList';
import { settings } from '../../../settings/server';

const dnsResolveMx = util.promisify(dns.resolveMx);

let emailDomainBlackList = [];
let emailDomainWhiteList = [];

settings.watch('Accounts_BlockedDomainsList', (value) => {
	if (!value) {
		emailDomainBlackList = [];
		return;
	}

	emailDomainBlackList = value
		.split(',')
		.filter(Boolean)
		.map((domain) => domain.trim());
});
settings.watch('Accounts_AllowedDomainsList', (value) => {
	if (!value) {
		emailDomainWhiteList = [];
		return;
	}

	emailDomainWhiteList = value
		.split(',')
		.filter(Boolean)
		.map((domain) => domain.trim());
});

export const validateEmailDomain = async function (email) {
    /* Implementation Hidden */
};

```