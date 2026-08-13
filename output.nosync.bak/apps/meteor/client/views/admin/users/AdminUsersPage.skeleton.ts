## File: apps/meteor/client/views/admin/users/AdminUsersPage.tsx

```typescript
import type { LicenseInfo } from '@rocket.chat/core-typings';
import { Callout, ContextualbarIcon, Skeleton, Tabs, TabsItem } from '@rocket.chat/fuselage';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { OptionProp } from '@rocket.chat/ui-client';
import {
	ExternalLink,
	ContextualbarHeader,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarDialog,
	usePagination,
	useSort,
	Page,
	PageHeader,
	PageContent,
} from '@rocket.chat/ui-client';
import { useRouteParameter, useTranslation, useRouter, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Trans } from 'react-i18next';

import AdminInviteUsers from './AdminInviteUsers';
import AdminUserCreated from './AdminUserCreated';
import AdminUserForm from './AdminUserForm';
import AdminUserFormWithData from './AdminUserFormWithData';
import AdminUserInfoWithData from './AdminUserInfoWithData';
import AdminUserUpgrade from './AdminUserUpgrade';
import UsersPageHeaderContent from './UsersPageHeaderContent';
import UsersTable from './UsersTable';
import useFilteredUsers from './hooks/useFilteredUsers';
import usePendingUsersCount from './hooks/usePendingUsersCount';
import { useSeatsCap } from './useSeatsCap';
import { useLicenseLimitsByBehavior } from '../../../hooks/useLicenseLimitsByBehavior';
import { useShouldPreventAction } from '../../../hooks/useShouldPreventAction';
import { useCheckoutUrl } from '../subscription/hooks/useCheckoutUrl';

export type UsersFilters = {
	text: string;
	roles: OptionProp[];
};

export type AdminUsersTab = 'all' | 'active' | 'deactivated' | 'pending';

export type UsersTableSortingOption = 'name' | 'username' | 'emails.address' | 'status' | 'active' | 'freeSwitchExtension';

const AdminUsersPage = () => {
    /* Implementation Hidden */
};

export default AdminUsersPage;

```