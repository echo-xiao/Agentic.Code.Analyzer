## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/afterRemoveDepartment.ts

```typescript
import type { AtLeast, ILivechatAgent, ILivechatDepartment } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatUnit } from '@rocket.chat/models';

import { callbacks } from '../../../../../server/lib/callbacks';
import { cbLogger } from '../lib/logger';

const afterRemoveDepartment = async (options: {
	department: AtLeast<ILivechatDepartment, '_id' | 'businessHourId' | 'parentId'>;
	agentsId: ILivechatAgent['_id'][];
}) => {
    /* Implementation Hidden */
};

callbacks.add(
	'livechat.afterRemoveDepartment',
	(options) => afterRemoveDepartment(options),
	callbacks.priority.HIGH,
	'livechat-after-remove-department',
);

```