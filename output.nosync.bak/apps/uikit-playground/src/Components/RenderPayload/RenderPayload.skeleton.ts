## File: apps/uikit-playground/src/Components/RenderPayload/RenderPayload.tsx

```typescript
import {
	UiKitModal as uiKitModal,
	UiKitBanner as uiKitBanner,
	UiKitMessage as uiKitMessage,
	UiKitContextualBar as uiKitContextualBar,
} from '@rocket.chat/fuselage-ui-kit';

import type { ILayoutBlock } from '../../Context/initialState';
import { SurfaceOptions } from '../Preview/Display/Surface/constant';

const RenderPayload = ({
	blocks,
	surface = SurfaceOptions.Message,
}: {
	index?: number;
	blocks: ILayoutBlock[];
	surface?: SurfaceOptions;
}) => {
    /* Implementation Hidden */
};

export default RenderPayload;

```