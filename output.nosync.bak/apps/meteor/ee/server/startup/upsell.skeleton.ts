## File: apps/meteor/ee/server/startup/upsell.ts

```typescript
import { License } from '@rocket.chat/license';
import { Settings } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { notifyOnSettingChangedById } from '../../../app/lib/server/lib/notifyListener';
import { updateAuditedBySystem } from '../../../server/settings/lib/auditedSettingUpdates';

const handleHadTrial = (): void => {
    /* Implementation Hidden */
};

Meteor.startup(() => {
	License.onValidateLicense(handleHadTrial);
});

```