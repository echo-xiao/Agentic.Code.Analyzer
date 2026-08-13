## File: apps/meteor/client/views/room/modals/ReadReceiptsModal/ReadReceiptsModal.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { GenericModal, GenericModalSkeleton } from '@rocket.chat/ui-client';
import { useMethod, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ReadReceiptRow from './ReadReceiptRow';

type ReadReceiptsModalProps = {
	messageId: IMessage['_id'];
	onClose: () => void;
};

const ReadReceiptsModal = ({ messageId, onClose }: ReadReceiptsModalProps) => {
    /* Implementation Hidden */
};

export default ReadReceiptsModal;

```