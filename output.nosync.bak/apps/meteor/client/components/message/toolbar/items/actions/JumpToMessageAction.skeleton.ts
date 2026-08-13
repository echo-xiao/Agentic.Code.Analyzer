## File: apps/meteor/client/components/message/toolbar/items/actions/JumpToMessageAction.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useTranslation } from 'react-i18next';

import { setMessageJumpQueryStringParameter } from '../../../../../lib/utils/setMessageJumpQueryStringParameter';
import MessageToolbarItem from '../../MessageToolbarItem';

export type JumpToMessageActionProps = {
	id: 'jump-to-message' | 'jump-to-pin-message' | 'jump-to-star-message';
	message: IMessage;
};

const JumpToMessageAction = ({ id, message }: JumpToMessageActionProps) => {
    /* Implementation Hidden */
};

export default JumpToMessageAction;

```