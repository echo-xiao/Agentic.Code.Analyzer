## File: apps/meteor/client/views/omnichannel/contactInfo/EditContactInfo.tsx

```typescript
import type { ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import { ButtonGroup, Button, IconButton, Divider } from '@rocket.chat/fuselage';
import { Field, FieldLabel, FieldRow, FieldError, TextInput } from '@rocket.chat/fuselage-forms';
import { validateEmail } from '@rocket.chat/tools';
import {
	CustomFieldsForm,
	ContextualbarScrollableContent,
	ContextualbarFooter,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarDialog,
	ContextualbarSkeleton,
} from '@rocket.chat/ui-client';
import { useEndpoint, useSetModal } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment, useId } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AdvancedContactModal from './AdvancedContactModal';
import { useCreateContact } from './hooks/useCreateContact';
import { useEditContact } from './hooks/useEditContact';
import { hasAtLeastOnePermission } from '../../../../app/authorization/client';
import { useFormSubmitWithDirtyCheck } from '../../../hooks/useFormSubmitWithDirtyCheck';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import { omnichannelQueryKeys } from '../../../lib/queryKeys';
import { ContactManagerInput } from '../additionalForms';
import { useCustomFieldsMetadata } from '../directory/hooks/useCustomFieldsMetadata';

type ContactNewEditProps = {
	contactData?: Serialized<ILivechatContact> | null;
	onClose: () => void;
	onCancel: () => void;
};

type ContactFormData = {
	name: string;
	emails: { address: string }[];
	phones: { phoneNumber: string }[];
	customFields: Record<any, any>;
	contactManager: string;
};

const DEFAULT_VALUES = {
	name: '',
	emails: [],
	phones: [],
	contactManager: '',
	customFields: {},
};

const getInitialValues = (data: ContactNewEditProps['contactData']): ContactFormData => {
    /* Implementation Hidden */
};

const validateMultipleFields = (fieldsLength: number, hasLicense: boolean) => fieldsLength >= 1 && !hasLicense;

const EditContactInfo = ({ contactData, onClose, onCancel }: ContactNewEditProps) => {
    /* Implementation Hidden */
};

export default EditContactInfo;

```