## File: apps/uikit-playground/src/hooks/useNodesAndEdges.ts

```typescript
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { type Edge, MarkerType, useEdgesState, useNodesState } from 'reactflow';

import { context, updateFlowEdgesAction } from '../Context';

export function useNodesAndEdges() {
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