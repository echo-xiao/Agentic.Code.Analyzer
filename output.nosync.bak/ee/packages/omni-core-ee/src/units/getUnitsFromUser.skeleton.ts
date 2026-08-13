## File: ee/packages/omni-core-ee/src/units/getUnitsFromUser.ts

```typescript
import { Authorization } from '@rocket.chat/core-services';
import { LivechatUnit, LivechatDepartmentAgents } from '@rocket.chat/models';
import mem from 'mem';

import { defaultLogger } from '../utils/logger';

async function getUnitsFromUserRoles(user: string): Promise<string[]> {
    /* Implementation Hidden */
}

async function getDepartmentsFromUserRoles(user: string): Promise<string[]> {
    /* Implementation Hidden */
}

const memoizedGetUnitFromUserRoles = mem(getUnitsFromUserRoles, { maxAge: process.env.TEST_MODE ? 1 : 10000 });
const memoizedGetDepartmentsFromUserRoles = mem(getDepartmentsFromUserRoles, { maxAge: process.env.TEST_MODE ? 1 : 10000 });

async function hasUnits(): Promise<boolean> {
    /* Implementation Hidden */
}

// Units should't change really often, so we can cache the result
const memoizedHasUnits = mem(hasUnits, { maxAge: process.env.TEST_MODE ? 1 : 10000 });

export const getUnitsFromUser = async (userId?: string): Promise<string[] | undefined> => {
    /* Implementation Hidden */
};

```