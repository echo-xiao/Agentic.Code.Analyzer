## File: packages/livechat/src/components/uiKit/message/OverflowElement/OverflowOption.tsx

```typescript
import type * as uikit from '@rocket.chat/ui-kit';
import type { ComponentChild } from 'preact';
import type { TargetedEvent } from 'preact/compat';
import { useCallback } from 'preact/compat';

import { MenuItem } from '../../../Menu';

type OverflowOptionProps = uikit.Option & {
	confirm: boolean;
	parser: uikit.SurfaceRenderer<ComponentChild>;
	onClick: (value: string) => void;
};

const OverflowOption = ({ confirm, text, value, url, parser, onClick }: OverflowOptionProps) => {
    /* Implementation Hidden */
};

export default OverflowOption;

```