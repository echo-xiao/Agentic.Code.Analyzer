## File: apps/meteor/client/views/account/profile/getProfileInitialValues.ts

```typescript
import type { AvatarObject, IUser } from '@rocket.chat/core-typings';

import { getUserEmailAddress } from '../../../../lib/getUserEmailAddress';
import type { UserStatusInitialValues } from '../../../lib/getUserInitialStatus';
import { getUserStatusInitialValues } from '../../../lib/getUserInitialStatus';

export type AccountProfileFormValues = {
	email: string;
	name: string;
	username: string;
	avatar: AvatarObject;
	url: string;
	bio: string;
	customFields: Record<string, string>;
	nickname: string;
} & UserStatusInitialValues;

export const getProfileInitialValues = (user: IUser | null): AccountProfileFormValues => {
    /* Implementation Hidden */
};

```