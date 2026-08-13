## File: apps/meteor/client/components/InvitationBadge/InvitationBadge.tsx

```typescript
import { Icon } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { useTimeAgo } from '../../hooks/useTimeAgo';

export type InvitationBadgeProps = Omit<ComponentProps<typeof Icon>, 'name' | 'color' | 'role'> & {
	invitationDate: string | Date;
};

const InvitationBadge = ({ invitationDate, ...props }: InvitationBadgeProps) => {
    /* Implementation Hidden */
};

export default InvitationBadge;

```