## File: apps/meteor/client/views/omnichannel/slaPolicies/SlaEdit.tsx

```typescript
import type { IOmnichannelServiceLevelAgreements, Serialized } from '@rocket.chat/core-typings';
import {
	Field,
	FieldLabel,
	FieldRow,
	FieldError,
	TextInput,
	Button,
	NumberInput,
	ButtonGroup,
	ContextualbarFooter,
} from '@rocket.chat/fuselage';
import { ContextualbarScrollableContent } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useRoute, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { useController, useForm } from 'react-hook-form';

import { useFormSubmitWithDirtyCheck } from '../../../hooks/useFormSubmitWithDirtyCheck';

type SlaEditProps = {
	isNew?: boolean;
	slaId?: string;
	reload: () => void;
	data?: Serialized<IOmnichannelServiceLevelAgreements>;
};

type SlaEditFormData = {
	name: string;
	description?: string;
	dueTimeInMinutes: number;
};

function SlaEdit({ data, isNew, slaId, reload, ...props }: SlaEditProps) {
    /* Implementation Hidden */
}

export default SlaEdit;

```