## File: apps/meteor/client/views/e2e/EnterE2EPasswordModal/EnterE2EPasswordModal.tsx

```typescript
import { Box, PasswordInput, Field, FieldGroup, FieldRow, FieldError, FieldLink } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useEffect, useId, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useResetE2EPasswordMutation } from '../../hooks/useResetE2EPasswordMutation';

const isInvalidE2EEPasswordError = (error: unknown): boolean => error instanceof DOMException && error.name === 'OperationError';

export type EnterE2EPasswordModalProps = {
	onConfirm: (password: string) => void | Promise<void>;
	onClose: () => void;
	onCancel: () => void;
};

const EnterE2EPasswordModal = ({ onConfirm, onClose, onCancel }: EnterE2EPasswordModalProps) => {
    /* Implementation Hidden */
};

export default EnterE2EPasswordModal;

```