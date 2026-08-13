## File: apps/meteor/ee/app/license/server/startup.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { LicenseLimitKind } from '@rocket.chat/core-typings';
import { applyLicense, applyLicenseOrRemove, License } from '@rocket.chat/license';
import { Subscriptions, Users, Settings, LivechatContacts } from '@rocket.chat/models';
import { wrapExceptions } from '@rocket.chat/tools';
import moment from 'moment';

import { getAppCount } from './lib/getAppCount';
import { notifyOnSettingChangedById } from '../../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../../app/settings/server';
import { callbacks } from '../../../../server/lib/callbacks';
import { syncWorkspace } from '../../../../server/lib/cloud/syncWorkspace';

export const startLicense = async () => {
    /* Implementation Hidden */
};

```