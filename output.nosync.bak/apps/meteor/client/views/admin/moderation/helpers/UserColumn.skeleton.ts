## File: apps/meteor/client/views/admin/moderation/helpers/UserColumn.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import type { ComponentProps } from 'react';

export type UserColumnProps = {
	name?: string;
	username?: string;
	isDesktopOrLarger?: boolean;
	isProfile?: boolean;
	size: ComponentProps<typeof UserAvatar>['size'];
	fontSize?: string;
};

const UserColumn = ({ name, username, fontSize, size }: UserColumnProps) => {
    /* Implementation Hidden */
};

export default UserColumn;

```