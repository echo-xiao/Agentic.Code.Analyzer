## File: apps/meteor/client/views/room/Header/RoomToolbox/RoomToolbox.tsx

```typescript
import type { Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericMenu, HeaderToolbarAction, HeaderToolbarDivider } from '@rocket.chat/ui-client';
import { useRoomToolbox, type RenderToolboxItemParams, type RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoomToolboxActions } from './hooks/useRoomToolboxActions';

export type RoomToolboxProps = {
	className?: ComponentProps<typeof Box>['className'];
};

const RoomToolbox = ({ className }: RoomToolboxProps) => {
    /* Implementation Hidden */
};

export default memo(RoomToolbox);

```