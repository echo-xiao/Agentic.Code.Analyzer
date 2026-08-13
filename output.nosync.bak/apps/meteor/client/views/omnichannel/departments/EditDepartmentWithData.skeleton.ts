## File: apps/meteor/client/views/omnichannel/departments/EditDepartmentWithData.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import EditDepartment from './EditDepartment';
import EditDepartmentWithAllowedForwardData from './EditDepartmentWithAllowedForwardData';
import { FormSkeleton } from '../../../components/Skeleton';

const params = { onlyMyDepartments: 'true' } as const;

type EditDepartmentWithDataProps = {
	id?: string;
	title: string;
};

const EditDepartmentWithData = ({ id, title }: EditDepartmentWithDataProps) => {
    /* Implementation Hidden */
};

export default EditDepartmentWithData;

```