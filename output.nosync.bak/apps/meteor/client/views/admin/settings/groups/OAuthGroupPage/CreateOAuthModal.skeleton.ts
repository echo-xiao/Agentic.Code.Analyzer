## File: apps/meteor/client/views/admin/settings/groups/OAuthGroupPage/CreateOAuthModal.tsx

```typescript
import { TextInput, Field, FieldLabel, FieldRow, FieldError, Box, FieldHint } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type CreateOAuthModalProps = {
	onConfirm: (text: string) => Promise<void>;
	onClose: () => void;
};

type CreateOAuthModalFields = {
	customOAuthName: string;
};

const CreateOAuthModal = ({ onConfirm, onClose }: CreateOAuthModalProps) => {
    /* Implementation Hidden */
};

export default CreateOAuthModal;

```