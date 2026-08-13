## File: apps/meteor/app/livechat/server/lib/settings.ts

```typescript
import { OmnichannelSortingMechanismSettingType } from '@rocket.chat/core-typings';

import { showConnecting } from './utils';
import { settings } from '../../../settings/server';

export const getInquirySortMechanismSetting = (): OmnichannelSortingMechanismSettingType =>
	settings.get<OmnichannelSortingMechanismSettingType>('Omnichannel_sorting_mechanism') || OmnichannelSortingMechanismSettingType.Timestamp;

export async function getInitSettings() {
    /* Implementation Hidden */
}

```