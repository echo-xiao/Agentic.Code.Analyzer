## File: apps/meteor/app/livechat/server/lib/analytics/departments.ts

```typescript
import { LivechatRooms, Messages } from '@rocket.chat/models';

import { settings } from '../../../../settings/server';

type Params = {
	start: Date;
	end: Date;
	options?: any;
	departmentId?: string;
};

export const findAllRoomsAsync = async ({ start, end, answered, departmentId, options = {} }: Params & { answered?: boolean }) => {
    /* Implementation Hidden */
};

export const findAllAverageOfChatDurationTimeAsync = async ({ start, end, departmentId, options = {} }: Params) => {
    /* Implementation Hidden */
};

export const findAllAverageServiceTimeAsync = async ({ start, end, departmentId, options = {} }: Params) => {
    /* Implementation Hidden */
};

export const findAllServiceTimeAsync = async ({ start, end, departmentId, options = {} }: Params) => {
    /* Implementation Hidden */
};

export const findAllAverageWaitingTimeAsync = async ({ start, end, departmentId, options = {} }: Params) => {
    /* Implementation Hidden */
};

export const findAllNumberOfTransferredRoomsAsync = async ({ start, end, departmentId, options = {} }: Params) => {
    /* Implementation Hidden */
};

export const findAllNumberOfAbandonedRoomsAsync = async ({ start, end, departmentId, options = {} }: Params) => {
    /* Implementation Hidden */
};

export const findPercentageOfAbandonedRoomsAsync = async ({ start, end, departmentId, options = {} }: Params) => {
    /* Implementation Hidden */
};

```