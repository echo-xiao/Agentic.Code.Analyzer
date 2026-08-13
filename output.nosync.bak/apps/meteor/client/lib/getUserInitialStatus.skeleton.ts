## File: apps/meteor/client/lib/getUserInitialStatus.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { UserStatus as UserStatusType } from '@rocket.chat/core-typings';

export type UserStatusInitialValues = {
	statusText: string;
	statusType: IUser['status'];
	statusDuration: string;
	statusCustomDate: string;
	statusCustomTime: string;
};

export const getUserStatusInitialValues = (user: IUser | null, initialStatusText?: string) => {
    /* Implementation Hidden */
};

```