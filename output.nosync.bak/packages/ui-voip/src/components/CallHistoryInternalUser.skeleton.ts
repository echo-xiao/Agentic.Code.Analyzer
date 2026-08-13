## File: packages/ui-voip/src/components/CallHistoryInternalUser.tsx

```typescript
import { Box, Icon, Avatar, StatusBullet } from '@rocket.chat/fuselage';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useUserAvatarPath, useUserPresence, useUserCard } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import type { CallHistoryInternalContact } from '../definitions';

type CallHistoryInternalUserProps = {
	contact: CallHistoryInternalContact;
};

const CallHistoryInternalUser = ({ contact: { username, name, _id } }: CallHistoryInternalUserProps) => {
    /* Implementation Hidden */
};

export default CallHistoryInternalUser;

```