## File: packages/livechat/src/components/Tooltip/Tooltip.tsx

```typescript
import type { HTMLAttributes } from 'preact/compat';

import styles from './styles.scss';
import { createClassName } from '../../helpers/createClassName';

export type Placement = 'left' | 'top' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | null;

const getPositioningStyle = (
	placement: Placement,
	{ left, top, right, bottom }: { left: number; top: number; right: number; bottom: number },
) => {
    /* Implementation Hidden */
};

export type TooltipProps = {
	hidden?: boolean;
	placement: Placement;
	floating?: boolean;
	triggerBounds: { left: number; top: number; right: number; bottom: number };
} & Omit<HTMLAttributes<HTMLDivElement>, 'ref'>;

const Tooltip = ({ children, hidden = false, placement, floating = false, triggerBounds, ...props }: TooltipProps) => (
	<div
		className={createClassName(styles, 'tooltip', { hidden, placement, floating })}
		style={floating ? getPositioningStyle(placement, triggerBounds) : {}}
		{...props}
	>
		{children}
	</div>
);

export default Tooltip;

```