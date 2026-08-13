## File: packages/livechat/src/components/uiKit/message/StaticSelectElement/index.tsx

```typescript
import type * as uikit from '@rocket.chat/ui-kit';
import type { ComponentChild } from 'preact';
import type { TargetedEvent } from 'preact/compat';
import { memo, useCallback, useMemo } from 'preact/compat';

import styles from './styles.scss';
import { createClassName } from '../../../../helpers/createClassName';
import { SelectInput } from '../../../Form/SelectInput';
import { usePerformAction } from '../Block';

type StaticSelectElementProps = uikit.StaticSelectElement & {
	parser: uikit.SurfaceRenderer<ComponentChild>;
};

const StaticSelectElement = ({
	actionId,
	confirm,
	placeholder,
	options /* , optionGroups */,
	initialOption,
	parser,
}: StaticSelectElementProps) => {
    /* Implementation Hidden */
};

export default memo(StaticSelectElement);

```