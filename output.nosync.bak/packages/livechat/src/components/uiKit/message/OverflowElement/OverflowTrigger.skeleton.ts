## File: packages/livechat/src/components/uiKit/message/OverflowElement/OverflowTrigger.tsx

```typescript
import type { TargetedEvent } from 'preact/compat';
import { useCallback } from 'preact/compat';

import styles from './styles.scss';
import { createClassName } from '../../../../helpers/createClassName';
import KebabIcon from '../../../../icons/kebab.svg';
import { Button } from '../../../Button';

type OverflowTriggerProps = {
	loading: boolean;
	onClick: () => void;
};

const OverflowTrigger = ({ loading, onClick }: OverflowTriggerProps) => {
    /* Implementation Hidden */
};

export default OverflowTrigger;

```