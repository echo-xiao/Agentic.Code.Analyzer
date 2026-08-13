## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/onAgentAssignmentFailed.ts

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';

import { settings } from '../../../../../app/settings/server';
import { callbacks } from '../../../../../server/lib/callbacks';

const handleOnAgentAssignmentFailed = async (
	room: IOmnichannelRoom,
	{
		inquiry,
		options,
	}: {
		inquiry: any;
		options: {
			forwardingToDepartment?: { oldDepartmentId?: string; transferData?: any };
			clientAction?: boolean;
		};
	},
) => {
    /* Implementation Hidden */
};

callbacks.add(
	'livechat.onAgentAssignmentFailed',
	handleOnAgentAssignmentFailed,
	callbacks.priority.HIGH,
	'livechat-agent-assignment-failed',
);

```