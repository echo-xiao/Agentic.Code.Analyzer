## File: apps/meteor/client/views/room/composer/ComposerContainer.tsx

```typescript
import { isOmnichannelRoom, isRoomFederated, isRoomNativeFederated } from '@rocket.chat/core-typings';
import { usePermission } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

import ComposerAirGappedRestricted from './ComposerAirGappedRestricted';
import ComposerAnonymous from './ComposerAnonymous';
import ComposerArchived from './ComposerArchived';
import ComposerBlocked from './ComposerBlocked';
import ComposerFederation from './ComposerFederation';
import ComposerJoinWithPassword from './ComposerJoinWithPassword';
import type { ComposerMessageProps } from './ComposerMessage';
import ComposerMessage from './ComposerMessage';
import ComposerOmnichannel from './ComposerOmnichannel';
import ComposerReadOnly from './ComposerReadOnly';
import ComposerSelectMessages from './ComposerSelectMessages';
import { useRoom } from '../contexts/RoomContext';
import { useMessageComposerIsAnonymous } from './hooks/useMessageComposerIsAnonymous';
import { useMessageComposerIsArchived } from './hooks/useMessageComposerIsArchived';
import { useMessageComposerIsBlocked } from './hooks/useMessageComposerIsBlocked';
import { useMessageComposerIsReadOnly } from './hooks/useMessageComposerIsReadOnly';
import { useAirGappedRestriction } from '../../../hooks/useAirGappedRestriction';
import { useIsSelecting } from '../MessageList/contexts/SelectedMessagesContext';

const ComposerContainer = ({ children, ...props }: ComposerMessageProps) => {
    /* Implementation Hidden */
};

export default memo(ComposerContainer);

```