## File: apps/meteor/client/views/navigation/sidebar/badges/UnreadBadge.tsx

```typescript
import { SidebarV2ItemBadge } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

export type UnreadBadgeProps = {
	title: string;
	roomTitle?: string;
	variant: 'primary' | 'warning' | 'danger' | 'secondary';
	total: number;
};

const UnreadBadge = ({ title, variant, total, roomTitle }: UnreadBadgeProps) => {
    /* Implementation Hidden */
};

export default UnreadBadge;

```