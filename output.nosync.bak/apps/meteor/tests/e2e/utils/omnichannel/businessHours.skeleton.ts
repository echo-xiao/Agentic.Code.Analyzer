## File: apps/meteor/tests/e2e/utils/omnichannel/businessHours.ts

```typescript
import type { BaseTest } from '../test';

type CreateBusinessHoursParams = {
	id?: string | null;
	name?: string;
	description?: string;
	departments?: { departmentId: string }[];
};

export const createBusinessHour = async (api: BaseTest['api'], { name, departments = [] }: CreateBusinessHoursParams = {}) => {
    /* Implementation Hidden */
};

```