## File: packages/ui-avatar/src/components/UserAvatar.tsx

```typescript
import { useUserAvatarPath } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { BaseAvatarProps } from './BaseAvatar';
import BaseAvatar from './BaseAvatar';

type UsernameProp = {
	username: string;
	userId?: never;
};

type UserIdProp = {
	userId: string;
	username?: never;
};
type UserAvatarProps = Omit<BaseAvatarProps, 'url' | 'title'> & {
	etag?: string | null;
	url?: string;
	title?: string;
} & (UsernameProp | UserIdProp);

const UserAvatar = ({ username, userId, etag, ...rest }: UserAvatarProps) => {
    /* Implementation Hidden */
};

export default memo(UserAvatar);

```