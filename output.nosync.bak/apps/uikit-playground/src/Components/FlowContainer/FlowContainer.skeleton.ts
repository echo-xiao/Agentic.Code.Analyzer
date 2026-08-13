## File: apps/uikit-playground/src/Components/FlowContainer/FlowContainer.tsx

```typescript
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import ReactFlow, {
	MiniMap,
	Background,
	addEdge,
	updateEdge,
	type Node,
	type Viewport,
	type ReactFlowInstance,
	useReactFlow,
	type Connection,
	type Edge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import ConnectionLine from './ConnectionLine';
import ControlButton from './ControlButtons';
import UIKitWrapper from './UIKitWrapper/UIKitWrapper';
import { FlowParams } from './utils';
import { context } from '../../Context';
import { updateNodesAndViewPortAction } from '../../Context/action/updateNodesAndViewPortAction';
import { useNodesAndEdges } from '../../hooks/useNodesAndEdges';

const FlowContainer = () => {
    /* Implementation Hidden */
};

export default FlowContainer;

```