## File: apps/meteor/client/components/UserInfo/UserInfoAction.tsx

```typescript
import { Button, IconButton } from '@rocket.chat/fuselage';
import type { Keys as IconName } from '@rocket.chat/icons';
import type { ComponentProps } from 'react';

export type UserInfoActionProps = {
	icon: IconName;
} & ComponentProps<typeof Button>;

const UserInfoAction = ({ icon, label, title, ...props }: UserInfoActionProps) => {
    /* Implementation Hidden */
};

export default UserInfoAction;

```