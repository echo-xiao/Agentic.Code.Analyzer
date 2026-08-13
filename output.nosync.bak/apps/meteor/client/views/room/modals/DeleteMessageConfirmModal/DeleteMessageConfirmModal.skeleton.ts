## File: apps/meteor/client/views/room/modals/DeleteMessageConfirmModal/DeleteMessageConfirmModal.tsx

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { GenericModal } from '@rocket.chat/ui-client';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import type { ChatAPI } from '../../../../lib/chats/ChatAPI';

const DeleteMessageConfirmModal = ({
	room,
	chat,
	resolve,
	reject,
	onCancel,
	message,
}: {
	room?: IRoom;
	chat: ChatAPI;
	resolve: () => void;
	reject: (reason?: any) => void;
	message: IMessage;
	onCancel: () => void;
}) => {
    /* Implementation Hidden */
};

export default DeleteMessageConfirmModal;

```