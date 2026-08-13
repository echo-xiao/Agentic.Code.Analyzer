## File: apps/meteor/client/views/omnichannel/cannedResponses/contextualBar/CannedResponse/WrapCannedResponseList.tsx

```typescript
import type { IOmnichannelCannedResponse, ILivechatDepartment } from '@rocket.chat/core-typings';
import { useDebouncedValue, useLocalStorage, useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useSetModal, useRouter, useRoomToolbox } from '@rocket.chat/ui-contexts';
import type { ChangeEvent, MouseEvent } from 'react';
import { memo, useCallback, useState } from 'react';

import CannedResponseList from './CannedResponseList';
import { useChat } from '../../../../room/contexts/ChatContext';
import { useRoom } from '../../../../room/contexts/RoomContext';
import { useCannedResponseFilterOptions } from '../../../hooks/useCannedResponseFilterOptions';
import { useCannedResponseList } from '../../../hooks/useCannedResponseList';
import { useIsRoomOverMacLimit } from '../../../hooks/useIsRoomOverMacLimit';
import CreateCannedResponse from '../../modals/CreateCannedResponse';

export const WrapCannedResponseList = () => {
    /* Implementation Hidden */
};

export default memo(WrapCannedResponseList);

```