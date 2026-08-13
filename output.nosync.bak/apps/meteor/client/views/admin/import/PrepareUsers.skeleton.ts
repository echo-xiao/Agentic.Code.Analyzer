## File: apps/meteor/client/views/admin/import/PrepareUsers.tsx

```typescript
import { CheckBox, Table, Tag, Pagination, TableHead, TableRow, TableCell, TableBody } from '@rocket.chat/fuselage';
import type { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { UserDescriptor } from './UserDescriptor';

export type PrepareUsersProps = {
	usersCount: number;
	users: UserDescriptor[];
	setUsers: Dispatch<SetStateAction<UserDescriptor[]>>;
};

// TODO: review inner logic
const PrepareUsers = ({ usersCount, users, setUsers }: PrepareUsersProps) => {
    /* Implementation Hidden */
};

export default PrepareUsers;

```