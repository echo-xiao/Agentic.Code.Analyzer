## File: apps/meteor/ee/app/livechat-enterprise/server/lib/restrictQuery.ts

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatDepartment } from '@rocket.chat/models';
import { getUnitsFromUser } from '@rocket.chat/omni-core-ee';
import type { FilterOperators } from 'mongodb';

import { cbLogger } from './logger';

export const restrictQuery = async ({
	originalQuery = {},
	unitsFilter,
	userId,
}: {
	originalQuery?: FilterOperators<IOmnichannelRoom>;
	unitsFilter?: string[];
	userId?: string;
}) => {
    /* Implementation Hidden */
};

```