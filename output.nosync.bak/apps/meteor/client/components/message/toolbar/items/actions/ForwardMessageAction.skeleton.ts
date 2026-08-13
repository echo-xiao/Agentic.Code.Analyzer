## File: apps/meteor/client/components/message/toolbar/items/actions/ForwardMessageAction.tsx

```typescript
import { isE2EEMessage } from '@rocket.chat/core-typings';
import type { IRoom, IMessage } from '@rocket.chat/core-typings';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getPermaLink } from '../../../../../lib/getPermaLink';
import ForwardMessageModal from '../../../../../views/room/modals/ForwardMessageModal';
import MessageToolbarItem from '../../MessageToolbarItem';

export type ForwardMessageActionProps = {
	message: IMessage;
	room: IRoom;
};

const ForwardMessageAction = ({ message, room }: ForwardMessageActionProps) => {
    /* Implementation Hidden */
};

export default ForwardMessageAction;

```