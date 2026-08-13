## File: packages/livechat/src/components/uiKit/message/OverflowElement/OverflowElement.tsx

```typescript
import type * as uikit from '@rocket.chat/ui-kit';
import type { ComponentChild } from 'preact';
import type { TargetedEvent } from 'preact/compat';
import { memo, useCallback } from 'preact/compat';

import { MenuGroup, MenuPopover } from '../../../Menu';
import { usePerformAction } from '../Block';
import OverflowOption from './OverflowOption';
import OverflowTrigger from './OverflowTrigger';

type OverflowElementProps = uikit.OverflowElement & {
	parser: uikit.SurfaceRenderer<ComponentChild>;
};

const OverflowElement = ({ actionId, confirm, options, parser }: OverflowElementProps) => {
    /* Implementation Hidden */
};

export default memo(OverflowElement);

```