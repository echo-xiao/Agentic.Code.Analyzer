## File: packages/ui-avatar/src/components/MessageAvatar.tsx

```typescript
import { AvatarContainer } from '@rocket.chat/fuselage';
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react';

import UserAvatar from './UserAvatar';

type MessageAvatarProps = {
	emoji?: ReactNode;
	avatarUrl?: string;
	username: string;
	size?: ComponentProps<typeof UserAvatar>['size'];
} & Omit<HTMLAttributes<HTMLElement>, 'is'>;

const MessageAvatar = ({ emoji, avatarUrl, username, size = 'x36', ...props }: MessageAvatarProps) => {
    /* Implementation Hidden */
};

export default MessageAvatar;

```