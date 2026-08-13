## File: packages/omni-core/src/hooks/applyDepartmentRestrictions.ts

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import { makeFunction } from '@rocket.chat/patch-injection';
import type { FilterOperators } from 'mongodb';

export const applyDepartmentRestrictions = makeFunction(async (query: FilterOperators<ILivechatDepartment> = {}, _userId: string) => {
	return query;
});

```