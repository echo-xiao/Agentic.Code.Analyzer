## File: apps/meteor/ee/server/models/LivechatUnitMonitors.ts

```typescript
import { registerModel } from '@rocket.chat/models';

import { LivechatUnitMonitorsRaw } from './raw/LivechatUnitMonitors';
import { db } from '../../../server/database/utils';

registerModel('ILivechatUnitMonitorsModel', new LivechatUnitMonitorsRaw(db));

```