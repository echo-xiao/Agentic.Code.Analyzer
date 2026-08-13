## File: packages/ui-voip/src/components/Actions/ActionStrip.tsx

```typescript
import { Box, ButtonGroup } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';

export const ACTION_STRIP_TOTAL_HEIGHT = 52;

type ActionStripProps = {
	children: ReactNode;
	leftSlot?: ReactNode;
	rightSlot?: ReactNode;
};

const ActionStrip = ({ children, leftSlot, rightSlot }: ActionStripProps) => {
    /* Implementation Hidden */
};

export default ActionStrip;

```