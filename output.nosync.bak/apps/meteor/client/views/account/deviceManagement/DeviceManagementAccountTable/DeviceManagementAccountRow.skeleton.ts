## File: apps/meteor/client/views/account/deviceManagement/DeviceManagementAccountTable/DeviceManagementAccountRow.tsx

```typescript
import { Box, Button } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import DeviceIcon from '../../../../components/deviceManagement/DeviceIcon';
import { useDeviceLogout } from '../../../../hooks/useDeviceLogout';
import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';

type DevicesRowProps = {
	_id: string;
	deviceName?: string;
	deviceType?: string;
	deviceOSName?: string;
	loginAt: string;
	current?: boolean;
};

const DeviceManagementAccountRow = ({ _id, deviceName, deviceType = 'browser', deviceOSName, loginAt, current }: DevicesRowProps) => {
    /* Implementation Hidden */
};

export default DeviceManagementAccountRow;

```