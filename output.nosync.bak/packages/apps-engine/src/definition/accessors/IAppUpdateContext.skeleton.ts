## File: packages/apps-engine/src/definition/accessors/IAppUpdateContext.ts

```typescript
import type { IUser } from '../users';

export interface IAppUpdateContext {
	user?: IUser;
	oldAppVersion: string;
}

```