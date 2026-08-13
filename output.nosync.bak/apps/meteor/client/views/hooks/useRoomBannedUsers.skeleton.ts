## File: apps/meteor/client/views/hooks/useRoomBannedUsers.ts

```typescript
import type { IUser, RequiredField } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

import { roomsQueryKeys } from '../../lib/queryKeys';

export type BannedUser = RequiredField<Pick<IUser, '_id' | 'username' | 'name'>, '_id' | 'username'>;

type UseRoomBannedUsersProps = {
	rid: string;
	limit?: number;
	enabled?: boolean;
};

export const useRoomBannedUsers = ({ rid, limit = 50, enabled = true }: UseRoomBannedUsersProps) => {
    /* Implementation Hidden */
};

```