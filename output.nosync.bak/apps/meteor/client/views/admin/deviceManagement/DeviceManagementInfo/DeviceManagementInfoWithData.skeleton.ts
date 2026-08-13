## File: apps/meteor/client/views/admin/deviceManagement/DeviceManagementInfo/DeviceManagementInfoWithData.tsx

```typescript
import type { Serialized, DeviceManagementPopulatedSession } from '@rocket.chat/core-typings';
import { Box, States, StatesIcon, StatesTitle, StatesSubtitle } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarTitle,
	ContextualbarSkeletonBody,
} from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import DeviceManagementInfo from './DeviceManagementInfo';
import { deviceManagementQueryKeys } from '../../../../lib/queryKeys';

const convertSessionFromAPI = ({
	loginAt,
	logoutAt,
	...rest
}: Serialized<DeviceManagementPopulatedSession>): DeviceManagementPopulatedSession => ({
	loginAt: new Date(loginAt),
	...(logoutAt && { logoutAt: new Date(logoutAt) }),
	...rest,
});

export type DeviceInfoWithDataProps = { deviceId: string };

const DeviceInfoWithData = ({ deviceId }: DeviceInfoWithDataProps) => {
    /* Implementation Hidden */
};

export default DeviceInfoWithData;

```