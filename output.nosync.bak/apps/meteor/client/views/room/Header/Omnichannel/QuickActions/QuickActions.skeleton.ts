## File: apps/meteor/client/views/room/Header/Omnichannel/QuickActions/QuickActions.tsx

```typescript
import type { Box } from '@rocket.chat/fuselage';
import { HeaderToolbar, HeaderToolbarAction, HeaderToolbarDivider } from '@rocket.chat/ui-client';
import type { ComponentProps } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import QuickActionOptions from './QuickActionOptions';
import { useQuickActions } from './hooks/useQuickActions';
import { useOmnichannelRoom } from '../../../contexts/RoomContext';

export type QuickActionsProps = {
	className?: ComponentProps<typeof Box>['className'];
};

const QuickActions = ({ className }: QuickActionsProps) => {
    /* Implementation Hidden */
};

export default memo(QuickActions);

```