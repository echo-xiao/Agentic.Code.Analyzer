## File: apps/meteor/ee/app/license/server/airGappedRestrictions.ts

```typescript
import { AirGappedRestriction, License } from '@rocket.chat/license';
import { Settings, Statistics } from '@rocket.chat/models';

import { notifyOnSettingChangedById } from '../../../../app/lib/server/lib/notifyListener';
import { i18n } from '../../../../server/lib/i18n';
import { sendMessagesToAdmins } from '../../../../server/lib/sendMessagesToAdmins';
import { updateAuditedBySystem } from '../../../../server/settings/lib/auditedSettingUpdates';

const updateRestrictionSetting = async (remainingDays: number) => {
    /* Implementation Hidden */
};

const sendRocketCatWarningToAdmins = async (remainingDays: number) => {
    /* Implementation Hidden */
};

AirGappedRestriction.on('remainingDays', async ({ days }: { days: number }) => {
	await updateRestrictionSetting(days);
	await sendRocketCatWarningToAdmins(days);
});

License.onValidateLicense(async () => {
	const token = await Statistics.findLastStatsToken();
	void AirGappedRestriction.computeRestriction(token);
});

License.onRemoveLicense(async () => {
	const token = await Statistics.findLastStatsToken();
	void AirGappedRestriction.computeRestriction(token);
});

```