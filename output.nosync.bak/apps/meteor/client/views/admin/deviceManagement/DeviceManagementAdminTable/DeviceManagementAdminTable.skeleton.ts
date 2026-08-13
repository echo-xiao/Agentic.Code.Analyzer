## File: apps/meteor/client/views/admin/deviceManagement/DeviceManagementAdminTable/DeviceManagementAdminTable.tsx

```typescript
import type { DeviceManagementPopulatedSession, DeviceManagementSession, Serialized } from '@rocket.chat/core-typings';
import { useDebouncedValue, useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { GenericTableHeaderCell, usePagination, useSort } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import DeviceManagementAdminRow from './DeviceManagementAdminRow';
import FilterByText from '../../../../components/FilterByText';
import DeviceManagementTable from '../../../../components/deviceManagement/DeviceManagementTable';
import { deviceManagementQueryKeys } from '../../../../lib/queryKeys';

const sortMapping = {
	client: 'device.name',
	username: '_user.username',
	os: 'device.os.name',
	loginAt: 'loginAt',
};

const isSessionPopulatedSession = (
	session: Serialized<DeviceManagementPopulatedSession | DeviceManagementSession>,
): session is Serialized<DeviceManagementPopulatedSession> => '_user' in session;

const DeviceManagementAdminTable = () => {
    /* Implementation Hidden */
};

export default DeviceManagementAdminTable;

```