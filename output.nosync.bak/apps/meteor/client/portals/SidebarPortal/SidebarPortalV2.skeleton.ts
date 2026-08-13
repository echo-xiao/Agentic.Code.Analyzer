## File: apps/meteor/client/portals/SidebarPortal/SidebarPortalV2.tsx

```typescript
import { Box, AnimatedVisibility } from '@rocket.chat/fuselage';
import { useLayout } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { NAVIGATION_REGION_ID } from '../../lib/constants';

export type SidebarPortalProps = { children: ReactNode };

const SidebarPortal = ({ children }: SidebarPortalProps) => {
    /* Implementation Hidden */
};

export default memo(SidebarPortal);

```