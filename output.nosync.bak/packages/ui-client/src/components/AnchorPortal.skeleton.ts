## File: packages/ui-client/src/components/AnchorPortal.tsx

```typescript
import type { ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

import { ensureAnchorElement, refAnchorElement, unrefAnchorElement } from '../helpers/anchors';

export type AnchorPortalProps = {
	id: string;
	children: ReactNode;
};

const AnchorPortal = ({ id, children }: AnchorPortalProps) => {
    /* Implementation Hidden */
};

export default AnchorPortal;

```