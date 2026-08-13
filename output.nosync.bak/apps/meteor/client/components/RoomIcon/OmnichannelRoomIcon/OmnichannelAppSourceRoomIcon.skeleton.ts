## File: apps/meteor/client/components/RoomIcon/OmnichannelRoomIcon/OmnichannelAppSourceRoomIcon.tsx

```typescript
import type { IOmnichannelSourceFromApp } from '@rocket.chat/core-typings';
import { Icon, Box } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

import { useOmnichannelRoomIcon } from './context/OmnichannelRoomIconContext';

export type OmnichannelAppSourceRoomIconProps = {
	source: IOmnichannelSourceFromApp;
	color: ComponentProps<typeof Box>['color'];
	size: ComponentProps<typeof Icon>['size'];
	placement: 'sidebar' | 'default';
};

export const OmnichannelAppSourceRoomIcon = ({ source, color, size, placement }: OmnichannelAppSourceRoomIconProps) => {
    /* Implementation Hidden */
};

```