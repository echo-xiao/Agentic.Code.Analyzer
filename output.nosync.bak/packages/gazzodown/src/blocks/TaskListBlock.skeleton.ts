## File: packages/gazzodown/src/blocks/TaskListBlock.tsx

```typescript
import { CheckBox } from '@rocket.chat/fuselage';
import type * as MessageParser from '@rocket.chat/message-parser';
import { useContext } from 'react';

import { MarkupInteractionContext } from '../MarkupInteractionContext';
import InlineElements from '../elements/InlineElements';

export type TaskListBlockProps = {
	tasks: MessageParser.Task[];
};

const TaskListBlock = ({ tasks }: TaskListBlockProps) => {
    /* Implementation Hidden */
};

export default TaskListBlock;

```