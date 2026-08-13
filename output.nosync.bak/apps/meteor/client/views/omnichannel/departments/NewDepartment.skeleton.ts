## File: apps/meteor/client/views/omnichannel/departments/NewDepartment.tsx

```typescript
import { Callout } from '@rocket.chat/fuselage';
import { useEndpoint, useSetModal } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import EditDepartment from './EditDepartment';
import PageSkeleton from '../../../components/PageSkeleton';
import EnterpriseDepartmentsModal from '../modals/EnterpriseDepartmentsModal';

type NewDepartmentProps = {
	id?: string;
};

const NewDepartment = ({ id }: NewDepartmentProps) => {
    /* Implementation Hidden */
};

export default NewDepartment;

```