## File: apps/meteor/client/views/admin/deviceManagement/DeviceManagementAdminTable/DeviceManagementAdminRow.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useMediaQuery, useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericMenu, GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import { useRoute } from '@rocket.chat/ui-contexts';
import type { KeyboardEvent } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import DeviceIcon from '../../../../components/deviceManagement/DeviceIcon';
import { useDeviceLogout } from '../../../../hooks/useDeviceLogout';
import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';

type DeviceRowProps = {
	_id: string;
	username?: string;
	ip: string;
	deviceName?: string;
	deviceType?: string;
	deviceOSName?: string;
	loginAt: string;
	rcVersion?: string;
};

const DeviceManagementAdminRow = ({
	_id,
	username,
	ip,
	deviceName,
	deviceType = 'browser',
	deviceOSName = '',
	loginAt,
	rcVersion,
}: DeviceRowProps) => {
    /* Implementation Hidden */
};

export default DeviceManagementAdminRow;

```