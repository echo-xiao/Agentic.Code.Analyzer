## File: packages/livechat/src/components/uiKit/message/Mrkdwn/index.tsx

```typescript
import { memo } from 'preact/compat';

import styles from './styles.scss';
import { createClassName } from '../../../../helpers/createClassName';
import shortnameToUnicode from '../../../../lib/emoji/shortnameToUnicode';
import MarkdownBlock from '../../../MarkdownBlock';

const Mrkdwn = ({ text /* , verbatim = false */ }: { text: string }) => {
    /* Implementation Hidden */
};

export default memo(Mrkdwn);

```