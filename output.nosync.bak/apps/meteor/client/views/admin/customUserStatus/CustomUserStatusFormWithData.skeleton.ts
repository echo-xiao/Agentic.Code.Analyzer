## File: apps/meteor/client/views/admin/customUserStatus/CustomUserStatusFormWithData.tsx

```typescript
import type { IUserStatus } from '@rocket.chat/core-typings';
import { Box, Callout } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CustomUserStatusForm from './CustomUserStatusForm';
import { FormSkeleton } from '../../../components/Skeleton';

export type CustomUserStatusFormWithDataProps = {
	_id?: IUserStatus['_id'];
	onClose: () => void;
	onReload: () => void;
};

const CustomUserStatusFormWithData = ({ _id, onReload, onClose }: CustomUserStatusFormWithDataProps) => {
    /* Implementation Hidden */
};

export default CustomUserStatusFormWithData;

```