## File: apps/meteor/client/views/admin/moderation/UserReports/ModConsoleUserActions.tsx

```typescript
import { GenericMenu } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import type { ModConsoleUserRowProps } from './ModConsoleUserTableRow';
import useDeactivateUserAction from '../hooks/useDeactivateUserAction';
import useDismissUserAction from '../hooks/useDismissUserAction';
import useResetAvatarAction from '../hooks/useResetAvatarAction';

const ModConsoleUserActions = ({ report, onClick }: Omit<ModConsoleUserRowProps, 'isDesktopOrLarger'>) => {
    /* Implementation Hidden */
};

export default ModConsoleUserActions;

```