## File: apps/meteor/client/views/room/Header/Omnichannel/QuickActions/QuickActionOptions.tsx

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { Box, Dropdown, Option } from '@rocket.chat/fuselage';
import type { Keys as IconName } from '@rocket.chat/icons';
import { HeaderToolbarAction } from '@rocket.chat/ui-client';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useDropdownVisibility } from './hooks/useDropdownVisibility';
import type { QuickActionsActionOptions } from '../../../lib/quickActions';

export type QuickActionOptionsProps = {
	options: QuickActionsActionOptions;
	action: (id: string) => void;
	room: IOmnichannelRoom;
	icon: IconName;
};

const QuickActionOptions = ({ options, room, action, icon, ...props }: QuickActionOptionsProps) => {
    /* Implementation Hidden */
};

export default memo(QuickActionOptions);

```