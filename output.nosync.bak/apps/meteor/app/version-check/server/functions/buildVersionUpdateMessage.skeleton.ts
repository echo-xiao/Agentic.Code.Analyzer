## File: apps/meteor/app/version-check/server/functions/buildVersionUpdateMessage.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Settings, Users } from '@rocket.chat/models';
import semver from 'semver';

import { i18n } from '../../../../server/lib/i18n';
import { sendMessagesToAdmins } from '../../../../server/lib/sendMessagesToAdmins';
import { updateAuditedBySystem } from '../../../../server/settings/lib/auditedSettingUpdates';
import { notifyOnSettingChangedById } from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';
import { Info } from '../../../utils/rocketchat.info';

const cleanupOutdatedVersionUpdateBanners = async (): Promise<void> => {
    /* Implementation Hidden */
};

export const buildVersionUpdateMessage = async (
	versions: {
		version: string;
		security: boolean;
		infoUrl: string;
	}[] = [],
) => {
    /* Implementation Hidden */
};

```