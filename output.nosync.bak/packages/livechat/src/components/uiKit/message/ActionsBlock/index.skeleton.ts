## File: packages/livechat/src/components/uiKit/message/ActionsBlock/index.tsx

```typescript
import type * as uikit from '@rocket.chat/ui-kit';
import { useState, useMemo, useCallback } from 'preact/compat';
import { useTranslation } from 'react-i18next';

import type { MessageParser } from '..';
import { createClassName } from '../../../../helpers/createClassName';
import { Button } from '../../../Button';
import Block from '../Block';
import styles from './styles.scss';

type ActionsBlockProps = uikit.ActionsBlock & {
	parser: MessageParser;
};

const ActionsBlock = ({ appId, blockId, elements, parser }: ActionsBlockProps) => {
    /* Implementation Hidden */
};

export default ActionsBlock;

```