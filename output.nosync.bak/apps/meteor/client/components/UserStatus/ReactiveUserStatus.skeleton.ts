## File: apps/meteor/client/components/UserStatus/ReactiveUserStatus.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { UserStatus } from '@rocket.chat/ui-client';
import { useUserPresence } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { memo } from 'react';

export type ReactiveUserStatusProps = {
	uid: IUser['_id'];
} & ComponentProps<typeof UserStatus.UserStatus>;

const ReactiveUserStatus = ({ uid, ...props }: ReactiveUserStatusProps) => {
    /* Implementation Hidden */
};

export default memo(ReactiveUserStatus);

```