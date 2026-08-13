## File: packages/ui-voip/src/components/ToggleButton.tsx

```typescript
import { Icon, IconButton } from '@rocket.chat/fuselage';
import type { Keys } from '@rocket.chat/icons';
import type { ComponentProps } from 'react';

type ToggleButtonProps = {
	label: string; // label should not change due to a11y constraints
	icons: [defaultIcon: Keys, pressedIcon: Keys];
	titles: [defaultTitle: string, pressedTitle: string]; // Titles might change though
	disabled?: boolean;
	pressed?: boolean;
	onToggle?: () => void;
} & Omit<ComponentProps<typeof IconButton>, 'icon' | 'title' | 'aria-label' | 'disabled' | 'onClick'>;

const ToggleButton = ({
	disabled,
	label,
	pressed,
	icons,
	titles,
	onToggle,
	danger = true,
	secondary = true,
	tiny = false,
	...props
}: ToggleButtonProps) => {
    /* Implementation Hidden */
};

export default ToggleButton;

```