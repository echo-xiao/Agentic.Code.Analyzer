## File: apps/meteor/client/views/admin/permissions/EditRolePageWithData.tsx

```typescript
import type { IRole } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { useRouteParameter } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import EditRolePage from './EditRolePage';
import { useRole } from './hooks/useRole';
import GenericError from '../../../components/GenericError';
import PageSkeleton from '../../../components/PageSkeleton';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

export type EditRolePageWithDataProps = { roleId?: IRole['_id'] };

const EditRolePageWithData = ({ roleId }: EditRolePageWithDataProps) => {
    /* Implementation Hidden */
};

export default EditRolePageWithData;

```