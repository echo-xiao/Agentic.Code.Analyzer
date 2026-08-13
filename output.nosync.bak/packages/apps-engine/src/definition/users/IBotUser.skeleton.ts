## File: packages/apps-engine/src/definition/users/IBotUser.ts

```typescript
import type { IUser } from './IUser';
import type { UserType } from './UserType';

export interface IBotUser extends Omit<IUser, 'emails'> {
	type: UserType.BOT | UserType.APP;
}

```