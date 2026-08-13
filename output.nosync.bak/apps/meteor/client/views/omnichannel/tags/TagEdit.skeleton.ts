## File: apps/meteor/client/views/omnichannel/tags/TagEdit.tsx

```typescript
import type { ILivechatDepartment, ILivechatTag, Serialized } from '@rocket.chat/core-typings';
import { Field, FieldLabel, FieldRow, FieldError, TextInput, Button, ButtonGroup, FieldGroup, Box } from '@rocket.chat/fuselage';
import {
	ContextualbarScrollableContent,
	ContextualbarFooter,
	ContextualbarTitle,
	ContextualbarHeader,
	ContextualbarClose,
} from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useRemoveTag } from './useRemoveTag';
import { useFormSubmitWithDirtyCheck } from '../../../hooks/useFormSubmitWithDirtyCheck';
import AutoCompleteDepartmentMultiple from '../components/AutoCompleteDepartmentMultiple';

type TagEditPayload = {
	name: string;
	description: string;
	departments: { label: string; value: string }[];
};

type TagEditProps = {
	tagData?: Serialized<ILivechatTag>;
	currentDepartments?: Serialized<ILivechatDepartment>[];
	onClose: () => void;
};

const TagEdit = ({ tagData, currentDepartments, onClose }: TagEditProps) => {
    /* Implementation Hidden */
};

export default TagEdit;

```