## File: apps/meteor/tests/mocks/data/marketplace.ts

```typescript
import { faker } from '@faker-js/faker';
import type { AppStatus } from '@rocket.chat/apps';
import { AppSubscriptionStatus } from '@rocket.chat/core-typings';
import type { AppSubscriptionInfo, App } from '@rocket.chat/core-typings';

import { createFakeApp } from '../data';

// Zero-value of the subscriptionInfo field on marketplace-api
// returned by the API when the app has no value assigned to the field
const subscriptionInfoZero = (): AppSubscriptionInfo => ({
	typeOf: '',
	status: '' as AppSubscriptionStatus, // real value that is sent currently, enum should be updated
	statusFromBilling: false,
	isSeatBased: false,
	seats: 0,
	maxSeats: 0,
	license: {
		license: '',
		version: 0,
		expireDate: '0001-01-01T00:00:00Z',
	},
	startDate: '0001-01-01T00:00:00Z',
	periodEnd: '0001-01-01T00:00:00Z',
	endDate: '0001-01-01T00:00:00Z',
	// externallyManaged: false, // TODO add to typings
	isSubscribedViaBundle: false,
});

/*
 * Creates a fake record of an app that has been bought from the Marketplace
 */
export function createFakeAppBought(partial: Partial<App> = {}): App {
    /* Implementation Hidden */
}

export function createFakeAppSubscribed(partial: Partial<App> = {}): App {
    /* Implementation Hidden */
}

export function createFakeAppInstalledMarketplace(partial: Partial<App> = {}): App {
    /* Implementation Hidden */
}

export function createFakeAppPrivate(partial: Partial<App> = {}): App {
    /* Implementation Hidden */
}

```