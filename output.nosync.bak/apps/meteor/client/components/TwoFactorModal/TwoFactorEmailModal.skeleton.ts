## File: apps/meteor/client/components/TwoFactorModal/TwoFactorEmailModal.tsx

```typescript
import { Box, Button } from '@rocket.chat/fuselage';
import { FieldGroup, TextInput, Field, FieldLabel, FieldRow, FieldError } from '@rocket.chat/fuselage-forms';
import { GenericModal } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { OnConfirm } from './TwoFactorModal';
import { Method } from './TwoFactorModal';

export type TwoFactorEmailModalProps = {
	onConfirm: OnConfirm;
	onClose: () => void;
	invalidAttempt?: boolean;
	emailOrUsername: string;
};

type TwoFactorEmailFormData = {
	code: string;
};

const TwoFactorEmailModal = ({ onConfirm, onClose, emailOrUsername, invalidAttempt }: TwoFactorEmailModalProps) => {
    /* Implementation Hidden */
};

export default TwoFactorEmailModal;

```