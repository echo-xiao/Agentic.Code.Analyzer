## File: apps/meteor/tests/data/livechat/units.ts

```typescript
import { faker } from '@faker-js/faker';
import type { IOmnichannelBusinessUnit } from '@rocket.chat/core-typings';

import { methodCall, credentials, request, api } from '../api-data';
import type { DummyResponse } from './utils';

export const createMonitor = async (username: string): Promise<{ _id: string; username: string; role: string[] }> => {
    /* Implementation Hidden */
};

export const createUnit = async (
	monitorId: string,
	username: string,
	departmentIds: string[],
	name?: string,
	extraMonitor: { monitorId: string; username: string }[] = [],
): Promise<IOmnichannelBusinessUnit> => {
    /* Implementation Hidden */
};

export const deleteUnit = async (unit: IOmnichannelBusinessUnit): Promise<IOmnichannelBusinessUnit> => {
    /* Implementation Hidden */
};

export const getUnit = (unitId: string): Promise<IOmnichannelBusinessUnit> => {
    /* Implementation Hidden */
};

```