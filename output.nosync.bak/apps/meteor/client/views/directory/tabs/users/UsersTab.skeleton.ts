## File: apps/meteor/client/views/directory/tabs/users/UsersTab.tsx

```typescript
import { usePermission } from '@rocket.chat/ui-contexts';

import UsersTable from './UsersTable';
import NotAuthorizedPage from '../../../notAuthorized/NotAuthorizedPage';

export type UsersTabProps = {
	workspace?: 'external' | 'local';
};

const UsersTab = (props: UsersTabProps) => {
    /* Implementation Hidden */
};

export default UsersTab;

```