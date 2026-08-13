## File: apps/uikit-playground/src/Components/FlowContainer/UIKitWrapper/UIKitWrapper.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useContext } from 'react';
import { Handle, Position } from 'reactflow';
import './UIKitWrapper.scss';

import { context } from '../../../Context';
import type { idType } from '../../../Context/initialState';
import SurfaceRender from '../../Preview/Display/Surface/SurfaceRender';
import RenderPayload from '../../RenderPayload/RenderPayload';

const UIKitWrapper = ({ id, data }: { id: string; data: idType }) => {
    /* Implementation Hidden */
};

export default UIKitWrapper;

```