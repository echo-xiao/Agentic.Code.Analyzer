## File: apps/meteor/client/views/admin/workspace/VersionCard/components/VersionCardActionItem.tsx

```typescript
import { Box, FramedIcon } from '@rocket.chat/fuselage';
import type { Keys } from '@rocket.chat/icons';
import type { ReactNode } from 'react';

export type VersionActionItem = {
	danger?: boolean;
	icon: Keys;
	label: ReactNode;
};

export type VersionCardActionItemProps = VersionActionItem;

const VersionCardActionItem = ({ icon, label, danger }: VersionCardActionItemProps) => {
    /* Implementation Hidden */
};

export default VersionCardActionItem;

```