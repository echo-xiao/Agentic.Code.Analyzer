## File: packages/ui-voip/src/components/PeerInfo/InternalUser.tsx

```typescript
import type { UserStatus } from '@rocket.chat/core-typings';
import { Avatar, Box, Icon, StatusBullet } from '@rocket.chat/fuselage';

import type { Slot } from './useInfoSlots';

type InternalUserProps = {
	displayName: string;
	status?: UserStatus;
	avatarUrl?: string;
	callerId?: string | number;
	slots?: Slot[];
	remoteMuted?: boolean;
};

const getRemoteStatusText = (slots?: Slot[]) => {
    /* Implementation Hidden */
};

const InternalUser = ({ displayName, avatarUrl, callerId, status, slots, remoteMuted }: InternalUserProps) => {
    /* Implementation Hidden */
};

export default InternalUser;

```