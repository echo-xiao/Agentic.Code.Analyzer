## File: apps/meteor/client/components/UserAutoCompleteMultiple/UserAvatarChip.tsx

```typescript
import { Box, Chip, Icon } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import type { ComponentProps } from 'react';

export type UserAvatarChipProps = ComponentProps<typeof Chip> & {
	federated?: boolean;
	username: string;
	name?: string;
};

const UserAvatarChip = ({ federated, username, name, ...props }: UserAvatarChipProps) => {
    /* Implementation Hidden */
};

export default UserAvatarChip;

```