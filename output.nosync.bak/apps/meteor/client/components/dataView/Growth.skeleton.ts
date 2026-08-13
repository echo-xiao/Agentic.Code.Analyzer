## File: apps/meteor/client/components/dataView/Growth.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

import NegativeGrowthSymbol from './NegativeGrowthSymbol';
import PositiveGrowthSymbol from './PositiveGrowthSymbol';

export type GrowthProps = ComponentProps<typeof Box> & {
	children: number;
};

const Growth = ({ children, ...props }: GrowthProps) => {
    /* Implementation Hidden */
};

export default Growth;

```