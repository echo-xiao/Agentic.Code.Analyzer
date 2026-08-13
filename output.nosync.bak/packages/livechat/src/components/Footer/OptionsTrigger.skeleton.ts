## File: packages/livechat/src/components/Footer/OptionsTrigger.tsx

```typescript
import { type MouseEventHandler } from 'preact/compat';
import { useTranslation } from 'react-i18next';

import styles from './styles.scss';
import { createClassName } from '../../helpers/createClassName';

const handleMouseUp: MouseEventHandler<HTMLButtonElement> = ({ target }) => (target as HTMLButtonElement | null)?.blur();

type OptionsTriggerProps = {
	pop: () => void;
};

const OptionsTrigger = ({ pop }: OptionsTriggerProps) => {
    /* Implementation Hidden */
};

export default OptionsTrigger;

```