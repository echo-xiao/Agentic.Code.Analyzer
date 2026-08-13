## File: ee/packages/license/src/MockedLicenseBuilder.ts

```typescript
import { CoreModules } from '@rocket.chat/core-typings';
import type {
	InternalModuleName,
	GrantedModules,
	ILicenseTag,
	ILicenseV3,
	LicenseLimit,
	LicenseModule,
	LicensePeriod,
} from '@rocket.chat/core-typings';

import { encrypt, encryptStatsToken } from './token';

export class MockedLicenseBuilder {
	information: {
		id?: string;
		autoRenew: boolean;
		visualExpiration?: string;
		notifyAdminsAt?: string;
		notifyUsersAt?: string;
		trial: boolean;
		offline: boolean;
		createdAt: string;
		grantedBy: {
			method: 'manual' | 'self-service' | 'sales' | 'support' | 'reseller';
			seller?: string;
		};
		grantedTo?: {
			name?: string;
			company?: string;
			email?: string;
		};
		legalText?: string;
		notes?: string;
		tags?: ILicenseTag[];
	};

	validation: {
		serverUrls: {
			value: string;
			type: 'url' | 'regex' | 'hash';
		}[];

		serverVersions?: {
			value: string;
		}[];

		serverUniqueId?: string;
		cloudWorkspaceId?: string;
		validPeriods: LicensePeriod[];
		legalTextAgreement?: {
			type: 'required' | 'not-required' | 'accepted';
			acceptedVia?: 'cloud';
		};

		statisticsReport: {
			required: boolean;
			allowedStaleInDays?: number;
		};
	};

	constructor() {
        /* Implementation Hidden */
    }

	public withExpiredDate(): this {
        /* Implementation Hidden */
    }

	public withNotStartedDate(): this {
        /* Implementation Hidden */
    }

	public resetValidPeriods(): this {
        /* Implementation Hidden */
    }

	public withValidPeriod(period: LicensePeriod): this {
        /* Implementation Hidden */
    }

	public withGrantedTo(grantedTo: { name?: string; company?: string; email?: string }): this {
        /* Implementation Hidden */
    }

	grantedModules: GrantedModules = [];

	limits: {
		activeUsers?: LicenseLimit[];
		guestUsers?: LicenseLimit[];
		roomsPerGuest?: LicenseLimit<'prevent_action'>[];
		privateApps?: LicenseLimit[];
		marketplaceApps?: LicenseLimit[];
		monthlyActiveContacts?: LicenseLimit[];
	} = {};

	cloudMeta?: Record<string, any>;

	public withServerUrls(urls: { value: string; type: 'url' | 'regex' | 'hash' }): this {
        /* Implementation Hidden */
    }

	public withServerVersions(versions: { value: string }): this {
        /* Implementation Hidden */
    }

	public withGrantedModules(modules: LicenseModule[]): this {
        /* Implementation Hidden */
    }

	withNoGrantedModules(modules: LicenseModule[]): this {
        /* Implementation Hidden */
    }

	public withLimits<K extends keyof ILicenseV3['limits']>(key: K, value: ILicenseV3['limits'][K]): this {
        /* Implementation Hidden */
    }

	public build(): ILicenseV3 {
        /* Implementation Hidden */
    }

	public sign(): Promise<string> {
        /* Implementation Hidden */
    }
}

export class StatsTokenBuilder {
	private token: Record<string, any>;

	constructor() {
        /* Implementation Hidden */
    }

	public withTimeStamp(date: Date): StatsTokenBuilder {
        /* Implementation Hidden */
    }

	public build(): Record<string, any> {
        /* Implementation Hidden */
    }

	public sign(): Promise<string> {
        /* Implementation Hidden */
    }
}

```