## File: apps/uikit-playground/src/Components/Templates/Container/Payload.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Button } from '@rocket.chat/fuselage';
import type { LayoutBlock } from '@rocket.chat/ui-kit';
import { useContext, useMemo } from 'react';

import { context, templatesToggleAction, updatePayloadAction } from '../../../Context';
import type { ILayoutBlock } from '../../../Context/initialState';
import getUniqueId from '../../../utils/getUniqueId';
import SurfaceRender from '../../Preview/Display/Surface/SurfaceRender';
import type { SurfaceOptions } from '../../Preview/Display/Surface/constant';
import RenderPayload from '../../RenderPayload/RenderPayload';

const Payload = ({ blocks, surface }: { surface: SurfaceOptions; blocks: LayoutBlock[] }) => {
    /* Implementation Hidden */
};

export default Payload;

```