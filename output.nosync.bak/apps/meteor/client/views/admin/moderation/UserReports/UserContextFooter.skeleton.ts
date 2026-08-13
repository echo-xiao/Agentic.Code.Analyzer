## File: apps/meteor/client/views/admin/moderation/UserReports/UserContextFooter.tsx

```typescript
import { Button, ButtonGroup, Box } from '@rocket.chat/fuselage';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import useDeactivateUserAction from '../hooks/useDeactivateUserAction';
import useDismissUserAction from '../hooks/useDismissUserAction';
import useResetAvatarAction from '../hooks/useResetAvatarAction';

export type UserContextFooterProps = { userId: string; deleted: boolean };

const UserContextFooter = ({ userId, deleted }: UserContextFooterProps) => {
    /* Implementation Hidden */
};

export default UserContextFooter;

```