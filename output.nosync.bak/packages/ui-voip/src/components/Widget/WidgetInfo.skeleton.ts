## File: packages/ui-voip/src/components/Widget/WidgetInfo.tsx

```typescript
import { Box, Icon } from '@rocket.chat/fuselage';
import type { Keys as IconNames } from '@rocket.chat/icons';

type Slot = {
	text: string;
	type: 'warning' | 'info';
	icon?: IconNames;
};

type WidgetInfoProps = {
	slots?: Slot[];
	variant?: 'default' | 'card-content';
};

const WidgetInfo = ({ slots, variant = 'default' }: WidgetInfoProps) => {
    /* Implementation Hidden */
};

export default WidgetInfo;

```