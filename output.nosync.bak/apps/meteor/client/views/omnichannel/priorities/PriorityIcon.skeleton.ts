## File: apps/meteor/client/views/omnichannel/priorities/PriorityIcon.tsx

```typescript
import type { LivechatPriorityWeight } from '@rocket.chat/core-typings';
import { Icon } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

import { useOmnichannelPrioritiesConfig } from '../hooks/useOmnichannelPrioritiesConfig';

type PriorityIconProps = Omit<ComponentProps<typeof Icon>, 'name' | 'color'> & {
	level: LivechatPriorityWeight;
	showUnprioritized?: boolean;
};

export const PriorityIcon = ({ level, size = 20, showUnprioritized = false, ...props }: PriorityIconProps) => {
    /* Implementation Hidden */
};

```