## File: apps/uikit-playground/src/Components/PrototypeRender/PrototypeRender.tsx

```typescript
import './PrototypeRender.scss';
import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
import { useRef, useState } from 'react';
import type { Edge } from 'reactflow';

import type { ILayoutBlock, idType } from '../../Context/initialState';
import SurfaceRender from '../Preview/Display/Surface/SurfaceRender';
import type { SurfaceOptions } from '../Preview/Display/Surface/constant';
import RenderPayload from '../RenderPayload/RenderPayload';

const PrototypeRender = ({
	blocks,
	surface,
	flowEdges,
	activeActions,
	onSelectAction,
}: {
	blocks: ILayoutBlock[];
	surface: SurfaceOptions;
	flowEdges: Edge[];
	activeActions: idType[];
	onSelectAction: (id: idType) => void;
}) => {
    /* Implementation Hidden */
};

export default PrototypeRender;

```