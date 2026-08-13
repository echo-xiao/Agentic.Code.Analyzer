## File: apps/meteor/tests/data/teams.helper.ts

```typescript
import type { ITeam, TeamType } from '@rocket.chat/core-typings';

import { api, request } from './api-data';

export const createTeam = async (
	credentials: Record<string, any>,
	teamName: string,
	type: TeamType,
	members?: string[],
): Promise<ITeam> => {
    /* Implementation Hidden */
};

export const deleteTeam = async (credentials: Record<string, any>, teamName: string): Promise<void> => {
    /* Implementation Hidden */
};

```