## File: apps/meteor/server/lib/cloud/saveRegistrationData.ts

```typescript
import { applyLicense } from '@rocket.chat/license';
import { Settings } from '@rocket.chat/models';

import { syncCloudData } from './syncWorkspace/syncCloudData';
import { notifyOnSettingChangedById } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { updateAuditedBySystem } from '../../settings/lib/auditedSettingUpdates';

type SaveRegistrationDataDTO = {
	workspaceId: string;
	client_name: string;
	client_id: string;
	client_secret: string;
	client_secret_expires_at: number;
	publicKey: string;
	registration_client_uri: string;
};

type ManualSaveRegistrationDataDTO = SaveRegistrationDataDTO & { licenseData: { license: string } };

export async function saveRegistrationData({
	workspaceId,
	client_name,
	client_id,
	client_secret,
	client_secret_expires_at,
	publicKey,
	registration_client_uri,
}: SaveRegistrationDataDTO) {
    /* Implementation Hidden */
}

async function saveRegistrationDataBase({
	workspaceId,
	client_name,
	client_id,
	client_secret,
	client_secret_expires_at,
	publicKey,
	registration_client_uri,
}: SaveRegistrationDataDTO) {
    /* Implementation Hidden */
}

export async function saveRegistrationDataManual({
	workspaceId,
	client_name,
	client_id,
	client_secret,
	client_secret_expires_at,
	publicKey,
	registration_client_uri,
	licenseData,
}: ManualSaveRegistrationDataDTO) {
    /* Implementation Hidden */
}

```