## File: apps/meteor/client/views/omnichannel/contactInfo/ContactInfo/ReviewContactModal.tsx

```typescript
import type { ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import { Badge, Box, Field, FieldError, FieldGroup, FieldHint, FieldLabel, FieldRow, Select } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useAtLeastOnePermission } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { mapLivechatContactConflicts } from '../../../../../lib/mapLivechatContactConflicts';
import { useHasLicenseModule } from '../../../../hooks/useHasLicenseModule';
import { ContactManagerInput } from '../../additionalForms';
import { useCustomFieldsMetadata } from '../../directory/hooks/useCustomFieldsMetadata';
import { useReviewContact } from '../hooks/useReviewContact';

type ReviewContactModalProps = {
	contact: Serialized<ILivechatContact>;
	onCancel: () => void;
};

type HandleConflictsPayload = {
	name: string;
	contactManager: string;
	[key: string]: string;
};

const ReviewContactModal = ({ contact, onCancel }: ReviewContactModalProps) => {
    /* Implementation Hidden */
};

export default ReviewContactModal;

```