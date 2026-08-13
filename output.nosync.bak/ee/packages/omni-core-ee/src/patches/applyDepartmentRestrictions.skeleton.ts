## File: ee/packages/omni-core-ee/src/patches/applyDepartmentRestrictions.ts

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { applyDepartmentRestrictions } from '@rocket.chat/omni-core';
import type { FilterOperators } from 'mongodb';

import { addQueryRestrictionsToDepartmentsModel } from '../units/addRoleBasedRestrictionsToDepartment';
import { hooksLogger } from '../utils/logger';

export const applyDepartmentRestrictionsPatch = () => {
    /* Implementation Hidden */
};

```