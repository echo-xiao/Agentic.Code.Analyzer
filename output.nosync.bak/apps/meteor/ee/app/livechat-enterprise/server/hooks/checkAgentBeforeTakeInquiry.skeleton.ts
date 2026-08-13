## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/checkAgentBeforeTakeInquiry.ts

```typescript
import { Users } from '@rocket.chat/models';

import { allowAgentSkipQueue } from '../../../../../app/livechat/server/lib/Helper';
import { checkOnlineAgents } from '../../../../../app/livechat/server/lib/service-status';
import { settings } from '../../../../../app/settings/server';
import { callbacks } from '../../../../../server/lib/callbacks';
import { isAgentWithinChatLimits } from '../lib/Helper';
import { cbLogger } from '../lib/logger';

const validateMaxChats = async ({
	agent,
	inquiry,
}: {
	agent: {
		agentId: string;
	};
	inquiry: {
		_id: string;
		department: string;
	};
	options: {
		forwardingToDepartment?: {
			oldDepartmentId: string;
			transferData: any;
		};
		clientAction?: boolean;
	};
}) => {
    /* Implementation Hidden */
};

callbacks.add('livechat.checkAgentBeforeTakeInquiry', validateMaxChats, callbacks.priority.MEDIUM, 'livechat-before-take-inquiry');

```