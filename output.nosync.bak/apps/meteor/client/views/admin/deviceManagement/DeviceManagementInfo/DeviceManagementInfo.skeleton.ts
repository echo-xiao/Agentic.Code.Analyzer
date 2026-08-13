## File: apps/meteor/client/views/admin/deviceManagement/DeviceManagementInfo/DeviceManagementInfo.tsx

```typescript
import type { DeviceManagementPopulatedSession } from '@rocket.chat/core-typings';
import { Box, Button, ButtonGroup, StatusBullet } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import {
	ContextualbarHeader,
	ContextualbarClose,
	ContextualbarScrollableContent,
	ContextualbarFooter,
	ContextualbarTitle,
	InfoPanel,
	InfoPanelField,
	InfoPanelLabel,
	InfoPanelText,
} from '@rocket.chat/ui-client';
import { useRoute, useUserPresence } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useDeviceLogout } from '../../../../hooks/useDeviceLogout';
import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';

export type DeviceManagementInfoProps = DeviceManagementPopulatedSession;

const DeviceManagementInfo = ({ device, sessionId, loginAt, ip, userId, _user }: DeviceManagementInfoProps) => {
    /* Implementation Hidden */
};

export default DeviceManagementInfo;

```