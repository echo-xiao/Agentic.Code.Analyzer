## File: apps/meteor/client/views/admin/permissions/UsersInRole/UsersInRolePage.tsx

```typescript
import type { IRole, IRoom } from '@rocket.chat/core-typings';
import { Box, Field, FieldLabel, FieldRow, Margins, ButtonGroup, Button, Callout, FieldError } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { usePagination, Page, PageHeader, PageContent } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useId, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import UsersInRoleTable from './UsersInRoleTable';
import { useRemoveUserFromRole } from './hooks/useRemoveUserFromRole';
import RoomAutoComplete from '../../../../components/RoomAutoComplete';
import UserAutoCompleteMultiple from '../../../../components/UserAutoCompleteMultiple';

type UsersInRolePayload = {
	rid?: IRoom['_id'];
	users: string[];
};

export type UsersInRolePageProps = { role: IRole };

const UsersInRolePage = ({ role }: UsersInRolePageProps) => {
    /* Implementation Hidden */
};

export default UsersInRolePage;

```