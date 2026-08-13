## File: packages/ui-avatar/src/components/RoomAvatar.tsx

```typescript
import { useRoomAvatarPath } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

import type { BaseAvatarProps } from './BaseAvatar';
import Avatar from './BaseAvatar';

type RoomAvatarProps = Pick<BaseAvatarProps, 'size'> & {
	url?: string;
	room: {
		_id: string;
		type?: string;
		t?: string;
		avatarETag?: string;
	};
};

const RoomAvatar = function RoomAvatar({ room, url, size }: RoomAvatarProps) {
    /* Implementation Hidden */
};

export default memo(RoomAvatar);

```