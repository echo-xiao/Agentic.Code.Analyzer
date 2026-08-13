## File: apps/meteor/app/livechat/server/lib/analytics/agents.ts

```typescript
import { LivechatRooms, LivechatAgentActivity } from '@rocket.chat/models';

type Params = {
	start: Date;
	end: Date;
	options?: any;
};

export const findAllAverageServiceTimeAsync = async ({ start, end, options = {} }: Params) => {
    /* Implementation Hidden */
};

export const findAllServiceTimeAsync = async ({ start, end, options = {} }: Params) => {
    /* Implementation Hidden */
};

export const findAvailableServiceTimeHistoryAsync = async ({
	start,
	end,
	fullReport,
	options = {},
}: {
	start: string;
	end: string;
	fullReport: boolean;
	options: { sort?: Record<string, number>; offset?: number; count?: number };
}) => {
    /* Implementation Hidden */
};

```