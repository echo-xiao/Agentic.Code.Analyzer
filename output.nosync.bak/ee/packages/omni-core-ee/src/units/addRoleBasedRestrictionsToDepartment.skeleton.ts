## File: ee/packages/omni-core-ee/src/units/addRoleBasedRestrictionsToDepartment.ts

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import type { FilterOperators } from 'mongodb';

import { getUnitsFromUser } from './getUnitsFromUser';
import { defaultLogger } from '../utils/logger';

export const addQueryRestrictionsToDepartmentsModel = async (originalQuery: FilterOperators<ILivechatDepartment> = {}, userId: string) => {
    /* Implementation Hidden */
};

```