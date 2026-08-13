## File: apps/meteor/client/views/admin/permissions/EditRolePage.tsx

```typescript
import type { IRole } from '@rocket.chat/core-typings';
import { Box, ButtonGroup, Button, Margins } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal, ContextualbarFooter, ContextualbarScrollableContent } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useRoute, useEndpoint } from '@rocket.chat/ui-contexts';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import RoleForm from './RoleForm';

export type EditRolePageFormData = {
	roleId: string;
	name: string;
	description: string;
	scope: 'Users' | 'Subscriptions';
	mandatory2fa: boolean;
};

export type EditRolePageProps = { role?: IRole; isEnterprise: boolean };

const EditRolePage = ({ role, isEnterprise }: EditRolePageProps) => {
    /* Implementation Hidden */
};

export default EditRolePage;

```