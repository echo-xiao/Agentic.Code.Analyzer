## File: apps/meteor/client/views/admin/subscription/components/cards/PlanCard/ManageLicenseModal/ManageLicenseModal.tsx

```typescript
import { Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import { FieldLabel, Field, FieldRow, TextAreaInput } from '@rocket.chat/fuselage-forms';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { GenericModal, useInvalidateLicense } from '@rocket.chat/ui-client';
import { useSettingSetValue, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LicenseFilePreview from './LicenseFilePreview';
import LicenseStatus from './LicenseStatus';
import { getLicenseInvalidMessage } from './getLicenseInvalidMessage';
import { useLicenseFileInput } from './useLicenseFileInput';
import { isPlausibleLicense, useValidateLicense } from '../../../../hooks/useValidateLicense';

type ManageLicenseModalProps = {
	enterpriseLicense: string;
	onCancel: () => void;
};

const ManageLicenseModal = ({ enterpriseLicense, onCancel }: ManageLicenseModalProps) => {
    /* Implementation Hidden */
};

export default ManageLicenseModal;

```