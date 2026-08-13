## File: packages/livechat/src/components/Messages/MessageBlocks/index.tsx

```typescript
import { memo, useCallback } from 'preact/compat';

import styles from './styles.scss';
import { createClassName } from '../../../helpers/createClassName';
import { triggerAction, UIKitIncomingInteractionType, UIKitIncomingInteractionContainerType } from '../../../lib/uiKit';
import { renderMessageBlocks } from '../../uiKit';
import Surface from '../../uiKit/message/Surface';

type MessageBlocksProps = {
	blocks?: unknown[];
	mid?: string;
	rid?: string;
};

const MessageBlocks = ({ blocks = [], mid = undefined, rid = undefined }: MessageBlocksProps) => {
    /* Implementation Hidden */
};

export default memo(MessageBlocks);

```