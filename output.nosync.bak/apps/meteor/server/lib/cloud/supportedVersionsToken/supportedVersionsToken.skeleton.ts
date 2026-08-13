## File: apps/meteor/server/lib/cloud/supportedVersionsToken/supportedVersionsToken.ts

```typescript
import type { SettingValue } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { Settings } from '@rocket.chat/models';
import type { SignedSupportedVersions, SupportedVersions } from '@rocket.chat/server-cloud-communication';
import type { Response } from '@rocket.chat/server-fetch';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { supportedVersionsChooseLatest } from './supportedVersionsChooseLatest';
import { notifyOnSettingChangedById } from '../../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../../app/settings/server';
import { supportedVersions as supportedVersionsFromBuild } from '../../../../app/utils/rocketchat-supported-versions.info';
import { buildVersionUpdateMessage } from '../../../../app/version-check/server/functions/buildVersionUpdateMessage';
import { updateAuditedBySystem } from '../../../settings/lib/auditedSettingUpdates';
import { SystemLogger } from '../../logger/system';
import { generateWorkspaceBearerHttpHeader } from '../getWorkspaceAccessToken';

declare module '@rocket.chat/core-typings' {
	interface ILicenseV3 {
		supportedVersions?: SignedSupportedVersions;
	}
}

/** HELPERS */

export const wrapPromise = <T>(
	promise: Promise<T>,
): Promise<
	| {
			success: true;
			result: T;
	  }
	| {
			success: false;
			error: any;
	  }
> =>
	promise
		.then((result) => ({ success: true, result }) as const)
		.catch((error) => ({
			success: false,
			error,
		}));

export const handleResponse = async <T>(promise: Promise<Response>) => {
    /* Implementation Hidden */
};

const cacheValueInSettings = <T extends SettingValue>(
	key: string,
	fn: (retry?: number) => Promise<T>,
): (() => Promise<T>) & {
	reset: (retry?: number) => Promise<T>;
} => {
    /* Implementation Hidden */
};

const releaseEndpoint = process.env.OVERWRITE_INTERNAL_RELEASE_URL?.trim()
	? process.env.OVERWRITE_INTERNAL_RELEASE_URL.trim()
	: 'https://releases.rocket.chat/v2/server/supportedVersions';

const getSupportedVersionsFromCloud = async () => {
    /* Implementation Hidden */
};

const getSupportedVersionsToken = async (retry = 0) => {
    /* Implementation Hidden */
};

export const getCachedSupportedVersionsToken = cacheValueInSettings('Cloud_Workspace_Supported_Versions_Token', getSupportedVersionsToken);

```