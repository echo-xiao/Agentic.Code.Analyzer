## File: packages/ui-client/src/components/SidebarToggler/SidebarTogglerButton.tsx

```typescript
import { Box, IconButton } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import SidebarTogglerBadge from './SidebarTogglerBadge';

type SideBarTogglerButtonProps = {
	badge?: ReactNode;
	onClick: () => void;
};

const SideBarTogglerButton = ({ badge, onClick }: SideBarTogglerButtonProps) => {
    /* Implementation Hidden */
};

export default SideBarTogglerButton;

```