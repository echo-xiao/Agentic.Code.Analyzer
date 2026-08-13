## File: packages/livechat/src/components/uiKit/message/ButtonElement/index.tsx

```typescript
import * as uikit from '@rocket.chat/ui-kit';
import type { ComponentChild } from 'preact';
import type { TargetedEvent } from 'preact/compat';
import { memo, useCallback } from 'preact/compat';

import { createClassName } from '../../../../helpers/createClassName';
import { usePerformAction } from '../Block';
import styles from './styles.scss';

const handleMouseUp = ({ currentTarget }: TargetedEvent<HTMLElement, MouseEvent>) => currentTarget.blur();

type ButtonElementProps = uikit.ButtonElement & {
	context: uikit.BlockContext;
	parser: uikit.SurfaceRenderer<ComponentChild>;
};

const ButtonElement = ({ text, actionId, url, value, style, context, confirm, parser }: ButtonElementProps) => {
    /* Implementation Hidden */
};

export default memo(ButtonElement);

```