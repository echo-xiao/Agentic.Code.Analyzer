## File: apps/meteor/client/views/admin/customUserStatus/CustomUserStatusForm.tsx

```typescript
import type { IUserStatus } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { FieldGroup, Button, ButtonGroup, TextInput, Field, FieldLabel, FieldRow, FieldError, Select, Box } from '@rocket.chat/fuselage';
import { GenericModal, ContextualbarScrollableContent, ContextualbarFooter } from '@rocket.chat/ui-client';
import { useSetModal, useRoute, useToastMessageDispatch, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useId, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

type CustomUserStatusFormFormData = {
	name: string;
	statusType: string;
};

export type CustomUserStatusFormProps = {
	onClose: () => void;
	onReload: () => void;
	status?: IUserStatus;
};

const CustomUserStatusForm = ({ onClose, onReload, status }: CustomUserStatusFormProps) => {
    /* Implementation Hidden */
};

export default CustomUserStatusForm;

```