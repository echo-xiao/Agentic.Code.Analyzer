## File: apps/meteor/client/views/room/modals/ForwardMessageModal/ForwardMessageModal.tsx

```typescript
import type { IMessage, MessageQuoteAttachment } from '@rocket.chat/core-typings';
import {
	Modal,
	Field,
	FieldGroup,
	FieldLabel,
	FieldRow,
	FieldHint,
	ButtonGroup,
	Button,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
} from '@rocket.chat/fuselage';
import { useClipboard } from '@rocket.chat/fuselage-hooks';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint, useToastMessageDispatch, useUserAvatarPath } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { memo, useId } from 'react';
import { useForm, Controller } from 'react-hook-form';

import UserAndRoomAutoCompleteMultiple from '../../../../components/UserAndRoomAutoCompleteMultiple';
import { QuoteAttachment } from '../../../../components/message/content/attachments/QuoteAttachment';
import { prependReplies } from '../../../../lib/utils/prependReplies';

type ForwardMessageProps = {
	onClose: () => void;
	permalink: string;
	message: IMessage;
};

const ForwardMessageModal = ({ onClose, permalink, message }: ForwardMessageProps) => {
    /* Implementation Hidden */
};

export default memo(ForwardMessageModal);

```