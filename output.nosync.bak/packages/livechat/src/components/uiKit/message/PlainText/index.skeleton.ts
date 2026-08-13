## File: packages/livechat/src/components/uiKit/message/PlainText/index.tsx

```typescript
import { memo } from 'preact/compat';

import styles from './styles.scss';
import { createClassName } from '../../../../helpers/createClassName';
import shortnameToUnicode from '../../../../lib/emoji/shortnameToUnicode';
import MarkdownBlock from '../../../MarkdownBlock';

const PlainText = ({ text, emoji = false }: { text: string; emoji?: boolean }) => {
    /* Implementation Hidden */
};

export default memo(PlainText);

```