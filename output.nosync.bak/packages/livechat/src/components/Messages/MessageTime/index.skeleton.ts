## File: packages/livechat/src/components/Messages/MessageTime/index.tsx

```typescript
import { parseISO, isToday } from 'date-fns';
import type { TFunction } from 'i18next';
import type { CSSProperties } from 'preact/compat';
import { memo } from 'preact/compat';
import { withTranslation } from 'react-i18next';

import styles from './styles.scss';
import { createClassName } from '../../../helpers/createClassName';

const parseDate = (ts: number, t: TFunction) => {
    /* Implementation Hidden */
};

type MessageTimeProps = {
	ts: number;
	normal?: boolean;
	inverted?: boolean;
	className?: string;
	style?: CSSProperties;
	t: TFunction;
};
const MessageTime = ({ ts, normal, inverted, className, style = {}, t }: MessageTimeProps) => {
    /* Implementation Hidden */
};

export default withTranslation()(memo(MessageTime));

```