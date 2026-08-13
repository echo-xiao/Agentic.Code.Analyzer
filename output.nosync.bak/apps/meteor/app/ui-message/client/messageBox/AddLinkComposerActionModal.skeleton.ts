## File: apps/meteor/app/ui-message/client/messageBox/AddLinkComposerActionModal.tsx

```typescript
import { Field, FieldGroup, TextInput, FieldLabel, FieldRow, Box, FieldError } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEffect, useId } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { isValidLink } from '../../../../client/views/room/MessageList/lib/isValidLink';

export type AddLinkComposerActionModalProps = {
	selectedText?: string;
	onConfirm: (url: string, text: string) => void;
	onClose: () => void;
};

const AddLinkComposerActionModal = ({ selectedText, onClose, onConfirm }: AddLinkComposerActionModalProps) => {
    /* Implementation Hidden */
};

export default AddLinkComposerActionModal;

```