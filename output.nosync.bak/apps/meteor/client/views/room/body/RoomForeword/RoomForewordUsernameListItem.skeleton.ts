## File: apps/meteor/client/views/room/body/RoomForeword/RoomForewordUsernameListItem.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Icon, Tag, Skeleton } from '@rocket.chat/fuselage';
import { useUserDisplayName } from '@rocket.chat/ui-client';

import { useUserInfoQuery } from '../../../../hooks/useUserInfoQuery';

type RoomForewordUsernameListItemProps = {
	href: string | undefined;
	username: NonNullable<IUser['username']>;
};

const RoomForewordUsernameListItem = ({ username, href }: RoomForewordUsernameListItemProps) => {
    /* Implementation Hidden */
};

export default RoomForewordUsernameListItem;

```