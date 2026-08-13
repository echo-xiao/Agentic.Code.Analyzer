## File: packages/rest-typings/src/v1/teams/ITeamMemberParams.ts

```typescript
import type { IRole } from '@rocket.chat/core-typings';

export interface ITeamMemberParams {
	userId: string;
	roles?: Array<IRole['_id']> | null;
}

```