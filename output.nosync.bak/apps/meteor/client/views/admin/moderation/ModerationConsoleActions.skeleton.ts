## File: apps/meteor/client/views/admin/moderation/ModerationConsoleActions.tsx

```typescript
// import { Menu, Option } from '@rocket.chat/fuselage';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import type { ModerationConsoleRowProps } from './ModerationConsoleTableRow';
import useDeactivateUserAction from './hooks/useDeactivateUserAction';
import useDeleteMessagesAction from './hooks/useDeleteMessagesAction';
import useDismissUserAction from './hooks/useDismissUserAction';
import useResetAvatarAction from './hooks/useResetAvatarAction';

const ModerationConsoleActions = ({ report, onClick }: Omit<ModerationConsoleRowProps, 'isDesktopOrLarger'>) => {
    /* Implementation Hidden */
};

export default ModerationConsoleActions;

```