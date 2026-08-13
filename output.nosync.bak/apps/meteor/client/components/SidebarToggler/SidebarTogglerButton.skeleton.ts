## File: apps/meteor/client/components/SidebarToggler/SidebarTogglerButton.tsx

```typescript
import { Box, IconButton } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import SidebarTogglerBadge from './SidebarTogglerBadge';

export type SideBarTogglerButtonProps = {
	pressed?: boolean;
	badge?: ReactNode;
	onClick: () => void;
};

const SideBarTogglerButton = ({ pressed, badge, onClick }: SideBarTogglerButtonProps) => {
    /* Implementation Hidden */
};

export default SideBarTogglerButton;

```