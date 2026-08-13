## File: apps/meteor/ee/app/livechat-enterprise/server/settings.ts

```typescript
import { OmnichannelSortingMechanismSettingType } from '@rocket.chat/core-typings';
import { Settings } from '@rocket.chat/models';

import { settingsRegistry } from '../../../../app/settings/server';

const omnichannelEnabledQuery = { _id: 'Livechat_enabled', value: true };
const businessHoursEnabled = { _id: 'Livechat_enable_business_hours', value: true };

export const createSettings = async (): Promise<void> => {
    /* Implementation Hidden */
};

```