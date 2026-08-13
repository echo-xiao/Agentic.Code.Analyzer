## File: apps/meteor/server/lib/cloud/buildRegistrationData.ts

```typescript
import { LivechatContacts, Statistics, Users } from '@rocket.chat/models';
import moment from 'moment';

import { LICENSE_VERSION } from '../../../app/cloud/server/license';
import { settings } from '../../../app/settings/server';
import { statistics } from '../../../app/statistics/server';
import { Info } from '../../../app/utils/rocketchat.info';

export type WorkspaceRegistrationData<T> = {
	uniqueId: string;
	deploymentFingerprintHash: string;
	deploymentFingerprintVerified: boolean;
	workspaceId: string;
	address: string;
	contactName: string;
	contactEmail: T;
	seats: number;

	organizationType: string;
	industry: string;
	orgSize: string;
	country: string;
	language: string;
	allowMarketing: string;
	accountName: string;
	agreePrivacyTerms: string;
	website: string;
	siteName: string;
	workspaceType: unknown;
	deploymentMethod: string;
	deploymentPlatform: string;
	version: string;
	licenseVersion: number;
	license?: string;
	enterpriseReady: boolean;
	setupComplete: boolean;
	connectionDisable: boolean;
	npsEnabled: string;
	// TODO: Evaluate naming
	MAC: number;
	// activeContactsBillingMonth: number;
	// activeContactsYesterday: number;
	statsToken?: string;
};

export async function buildWorkspaceRegistrationData<T extends string | undefined>(contactEmail: T): Promise<WorkspaceRegistrationData<T>> {
    /* Implementation Hidden */
}

```