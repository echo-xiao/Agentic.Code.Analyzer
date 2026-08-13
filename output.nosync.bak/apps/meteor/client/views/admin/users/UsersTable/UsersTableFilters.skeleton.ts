## File: apps/meteor/client/views/admin/users/UsersTable/UsersTableFilters.tsx

```typescript
import type { IRole, Serialized } from '@rocket.chat/core-typings';
import { Box, Icon, Margins, TextInput } from '@rocket.chat/fuselage';
import { useBreakpoints } from '@rocket.chat/fuselage-hooks';
import type { OptionProp } from '@rocket.chat/ui-client';
import { MultiSelectCustom } from '@rocket.chat/ui-client';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { UsersFilters } from '../AdminUsersPage';

export type UsersTableFiltersProps = {
	setUsersFilters: Dispatch<SetStateAction<UsersFilters>>;
	roleData: { roles: Serialized<IRole>[] } | undefined;
};

const UsersTableFilters = ({ roleData, setUsersFilters }: UsersTableFiltersProps) => {
    /* Implementation Hidden */
};

export default UsersTableFilters;

```