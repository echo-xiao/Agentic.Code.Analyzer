## File: apps/meteor/client/hooks/useUserStatusTooltip.tsx

```typescript
import { Skeleton } from '@rocket.chat/fuselage';
import { UserPresenceContext, useTooltipClose, useTooltipOpen, useUserPresence } from '@rocket.chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useCallback, useContext, useMemo } from 'react';

import { UserStatusText } from '../components/UserStatusText';

export type UserStatusTooltipContentProps = { uid: string };

const UserStatusTooltipContent = ({ uid }: UserStatusTooltipContentProps) => {
    /* Implementation Hidden */
};

export function useUserStatusTooltip(uid: string | undefined, title?: string) {
    /* Implementation Hidden */
}

```