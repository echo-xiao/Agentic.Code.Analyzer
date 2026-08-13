## File: apps/meteor/client/views/room/Header/ParentRoom/ParentRoomButton.tsx

```typescript
import { IconButton, Skeleton } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

export type ParentRoomButtonProps = Omit<ComponentProps<typeof IconButton>, 'icon'> & { loading: boolean };

const ParentRoomButton = ({ loading, ...props }: ParentRoomButtonProps) => {
    /* Implementation Hidden */
};

export default ParentRoomButton;

```