## File: apps/uikit-playground/src/Components/FlowContainer/utils.ts

```typescript
import { MarkerType } from 'reactflow';

import type { ScreenType } from '../../Context/initialState';

export function createNodesAndEdges(screens: ScreenType[]) {
    /* Implementation Hidden */
}

export const FlowParams = {
	edgeType: 'smoothstep',
	markerEnd: {
		type: MarkerType.Arrow,
	},
	style: {
		strokeWidth: 2,
		stroke: 'var(--RCPG-primary-color)',
	},
};

```