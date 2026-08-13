## File: packages/ui-avatar/src/components/BaseAvatar.tsx

```typescript
import type { AvatarProps } from '@rocket.chat/fuselage';
import { Avatar, Skeleton } from '@rocket.chat/fuselage';
import { useStableCallback, usePrevious } from '@rocket.chat/fuselage-hooks';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';

export type BaseAvatarProps = Omit<AvatarProps, 'is'>;

const BaseAvatar = ({ url, onLoad, onError, size, ...props }: BaseAvatarProps) => {
    /* Implementation Hidden */
};

export default BaseAvatar;

```