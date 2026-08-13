## File: apps/meteor/client/components/message/uikit/UiKitMessageBlock.tsx

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { MessageBlock } from '@rocket.chat/fuselage';
import { UiKitComponent, UiKitMessage as UiKitMessageSurfaceRender, UiKitContext } from '@rocket.chat/fuselage-ui-kit';
import type { MessageSurfaceLayout } from '@rocket.chat/ui-kit';

import { useMessageBlockContextValue } from '../../../uikit/hooks/useMessageBlockContextValue';
import GazzodownText from '../../GazzodownText';

export type UiKitMessageBlockProps = {
	rid: IRoom['_id'];
	mid: IMessage['_id'];
	blocks: MessageSurfaceLayout;
};

const UiKitMessageBlock = ({ rid, mid, blocks }: UiKitMessageBlockProps) => {
    /* Implementation Hidden */
};

export default UiKitMessageBlock;

```