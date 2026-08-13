## File: apps/meteor/client/views/omnichannel/departments/EditDepartmentWithAllowedForwardData.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import type { EditDepartmentProps } from './EditDepartment';
import EditDepartment from './EditDepartment';
import { FormSkeleton } from '../../../components/Skeleton';

const EditDepartmentWithAllowedForwardData = ({ data, ...props }: Omit<EditDepartmentProps, 'allowedToForwardData'>) => {
    /* Implementation Hidden */
};

export default EditDepartmentWithAllowedForwardData;

```