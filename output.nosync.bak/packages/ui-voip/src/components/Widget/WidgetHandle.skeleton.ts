## File: packages/ui-voip/src/components/Widget/WidgetHandle.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Icon, Palette } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

import { useDraggableWidget } from './WidgetDraggableContext';

const dragHandle = css`
	cursor: grab;

	background-color: ${Palette.surface['surface-tint'].toString()};
	color: ${Palette.text['font-default'].toString()};

	&:hover {
		background-color: ${Palette.surface['surface-neutral'].toString()};
		color: ${Palette.text['font-info'].toString()};
	}
	&:active {
		cursor: grabbing;
	}
`;

const WidgetHandle = (props: ComponentProps<typeof Box>) => {
    /* Implementation Hidden */
};

export default WidgetHandle;

```