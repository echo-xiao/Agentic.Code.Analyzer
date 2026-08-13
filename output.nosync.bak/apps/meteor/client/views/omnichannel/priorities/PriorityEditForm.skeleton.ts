## File: apps/meteor/client/views/omnichannel/priorities/PriorityEditForm.tsx

```typescript
import type { ILivechatPriority, Serialized } from '@rocket.chat/core-typings';
import { Field, FieldError, FieldLabel, FieldRow, TextInput, Button, ButtonGroup, ContextualbarFooter } from '@rocket.chat/fuselage';
import { ContextualbarScrollableContent } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useFormSubmitWithDirtyCheck } from '../../../hooks/useFormSubmitWithDirtyCheck';

export type PriorityFormData = { name: string; reset: boolean };

export type PriorityEditFormProps = {
	data: Serialized<ILivechatPriority>;
	onSave: (values: PriorityFormData) => Promise<void>;
};

type PrioritySaveException = { success: false; error: TranslationKey | undefined };

const PriorityEditForm = ({ data, onSave }: PriorityEditFormProps) => {
    /* Implementation Hidden */
};

export default PriorityEditForm;

```