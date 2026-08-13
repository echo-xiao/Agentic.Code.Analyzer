## File: apps/meteor/client/views/account/profile/ActionConfirmModal.tsx

```typescript
import { Box, PasswordInput, TextInput, FieldGroup, Field, FieldRow, FieldError, FieldLabel } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useId } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type ActionConfirmModalProps = {
	isPassword: boolean;
	onConfirm: (input: string) => Promise<void>;
	onCancel: () => void;
};

const ActionConfirmModal = ({ isPassword, onConfirm, onCancel }: ActionConfirmModalProps) => {
    /* Implementation Hidden */
};

export default ActionConfirmModal;

```