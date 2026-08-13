## File: apps/meteor/client/views/omnichannel/modals/TranscriptModal.tsx

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import {
	Button,
	Modal,
	Box,
	ModalHeader,
	ModalIcon,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { Field, FieldGroup, FieldLabel, FieldRow, FieldError, TextInput } from '@rocket.chat/fuselage-forms';
import { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type TranscriptModalProps = {
	email: string;
	room: IOmnichannelRoom;
	onRequest: (email: string, subject: string) => void;
	onSend?: (email: string, subject: string, token: string) => void;
	onCancel: () => void;
	onDiscard: () => void;
};

const TranscriptModal = ({ email: emailDefault = '', room, onRequest, onSend, onCancel, onDiscard, ...props }: TranscriptModalProps) => {
    /* Implementation Hidden */
};

export default TranscriptModal;

```