## File: apps/meteor/client/views/admin/ABAC/ABACAttributesTab/AttributesForm.tsx

```typescript
import {
	Box,
	Button,
	ButtonGroup,
	ContextualbarFooter,
	Field,
	FieldError,
	FieldLabel,
	FieldRow,
	IconButton,
	TextInput,
} from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ContextualbarScrollableContent } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useCallback, useId, useMemo, Fragment, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { useViewRoomsAction } from '../hooks/useViewRoomsAction';

export type AttributesFormFormData = {
	name: string;
	attributeValues: { value: string }[];
	lockedAttributes: { value: string }[];
};

export type AttributesFormProps = {
	onSave: (data: AttributesFormFormData) => void;
	onCancel: () => void;
	description: string;
};

const AttributesForm = ({ onSave, onCancel, description }: AttributesFormProps) => {
    /* Implementation Hidden */
};

export default AttributesForm;

```