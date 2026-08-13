## File: apps/uikit-playground/src/Components/Preview/Display/Surface/Surface.tsx

```typescript
import type { DropResult } from '@hello-pangea/dnd';
import { Box } from '@rocket.chat/fuselage';
import { UiKitContext } from '@rocket.chat/fuselage-ui-kit';
import { useContext, useState, useEffect } from 'react';

import { reorder } from './Reorder';
import SurfaceRender from './SurfaceRender';
import { SurfaceOptions } from './constant';
import { context, updatePayloadAction, actionPreviewAction } from '../../../../Context';
import generateActionPreview from '../../../../Payload/actionPreview/generateActionPreview';
import type { Block } from '../../../Draggable/DraggableList';
import DraggableList from '../../../Draggable/DraggableList';

const Surface = () => {
    /* Implementation Hidden */
};

export default Surface;

```