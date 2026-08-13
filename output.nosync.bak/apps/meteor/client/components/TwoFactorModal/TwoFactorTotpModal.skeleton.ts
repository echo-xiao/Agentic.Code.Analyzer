## File: apps/meteor/client/components/TwoFactorModal/TwoFactorTotpModal.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { FieldGroup, TextInput, Field, FieldLabel, FieldRow, FieldError } from '@rocket.chat/fuselage-forms';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { OnConfirm } from './TwoFactorModal';
import { Method } from './TwoFactorModal';

export type TwoFactorTotpModalProps = {
	onConfirm: OnConfirm;
	onClose: () => void;
	onDismiss?: () => void;
	invalidAttempt?: boolean;
};

type TwoFactorTotpFormData = {
	code: string;
};

const TwoFactorTotpModal = ({ onConfirm, onClose, onDismiss, invalidAttempt }: TwoFactorTotpModalProps) => {
    /* Implementation Hidden */
};

export default TwoFactorTotpModal;

```