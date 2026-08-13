## File: apps/meteor/client/views/account/deviceManagement/DeviceManagementAccountTable/DeviceManagementAccountTable.tsx

```typescript
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { GenericTableHeaderCell, usePagination, useSort } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import DeviceManagementAccountRow from './DeviceManagementAccountRow';
import DeviceManagementTable from '../../../../components/deviceManagement/DeviceManagementTable';
import { deviceManagementQueryKeys } from '../../../../lib/queryKeys';

const sortMapping = {
	client: 'device.name',
	os: 'device.os.name',
	loginAt: 'loginAt',
};

const DeviceManagementAccountTable = () => {
    /* Implementation Hidden */
};

export default DeviceManagementAccountTable;

```