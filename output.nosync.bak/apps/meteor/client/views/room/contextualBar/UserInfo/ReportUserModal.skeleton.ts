## File: apps/meteor/client/views/room/contextualBar/UserInfo/ReportUserModal.tsx

```typescript
import { Box, FieldGroup, Field, FieldLabel, FieldRow, FieldError, TextAreaInput, FieldDescription } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { GenericModal } from '@rocket.chat/ui-client';
import { useId, type ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type ReportUserModalProps = {
	onConfirm: (reasonForReport: string) => void;
	onClose: () => void;
	displayName: string;
	username: string;
};

type ReportUserModalsFields = {
	reasonForReport: string;
};

const ReportUserModal = ({ username, displayName, onConfirm, onClose }: ReportUserModalProps) => {
    /* Implementation Hidden */
};

export default ReportUserModal;

```