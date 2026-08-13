## File: apps/meteor/client/views/room/composer/ComposerUserActionIndicator/ComposerUserActionIndicator.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useCallback, Fragment, useSyncExternalStore, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { UserAction, USER_ACTIVITIES } from '../../../../../app/ui/client/lib/UserAction';

const maxUsernames = 5;

const ACTION_PRIORITY: Record<string, number> = {
	[USER_ACTIVITIES.USER_RECORDING]: 0,
	[USER_ACTIVITIES.USER_UPLOADING]: 1,
	[USER_ACTIVITIES.USER_TYPING]: 2,
	[USER_ACTIVITIES.USER_PLAYING]: 3,
};

const ComposerUserActionIndicator = ({ rid, tmid }: { rid: string; tmid?: string }) => {
    /* Implementation Hidden */
};

export default ComposerUserActionIndicator;

```