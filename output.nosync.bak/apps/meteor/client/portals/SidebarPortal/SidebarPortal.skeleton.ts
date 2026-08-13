## File: apps/meteor/client/portals/SidebarPortal/SidebarPortal.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { memo } from 'react';
import { createPortal } from 'react-dom';

export type SidebarPortalProps = { children: ReactNode };

const SidebarPortal = ({ children }: SidebarPortalProps) => {
    /* Implementation Hidden */
};

export default memo(SidebarPortal);

```