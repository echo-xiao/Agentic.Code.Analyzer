## File: apps/meteor/client/sidebar/hooks/useAvatarTemplate.tsx

```typescript
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { useUserPreference } from '@rocket.chat/ui-contexts';
import type { ComponentType } from 'react';
import { useMemo } from 'react';

export const useAvatarTemplate = (
	sidebarViewMode?: 'extended' | 'medium' | 'condensed',
	sidebarDisplayAvatar?: boolean,
): null | ComponentType<SubscriptionWithRoom & { rid: string }> => {
    /* Implementation Hidden */
};

```