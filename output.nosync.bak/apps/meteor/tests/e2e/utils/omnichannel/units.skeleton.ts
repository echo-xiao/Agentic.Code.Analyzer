## File: apps/meteor/tests/e2e/utils/omnichannel/units.ts

```typescript
import { faker } from '@faker-js/faker';

import type { BaseTest } from '../test';

type CreateUnitParams = {
	id?: string | null;
	name?: string;
	visibility?: 'public' | 'private';
	monitors?: { monitorId: string; username: string }[];
	departments?: { departmentId: string }[];
};

const removeUnit = async (api: BaseTest['api'], id: string) => api.delete(`/livechat/units/${id}`);

export const createOrUpdateUnit = async (
	api: BaseTest['api'],
	{ id = null, name, visibility, monitors, departments }: CreateUnitParams = {},
) => {
    /* Implementation Hidden */
};

export const fetchUnitMonitors = async (api: BaseTest['api'], unitId: string) => {
    /* Implementation Hidden */
};

```