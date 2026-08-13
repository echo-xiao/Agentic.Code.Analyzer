## File: apps/meteor/client/navbar/NavBarSettingsToolbar/UserMenu/EditStatusModal.tsx

```typescript
import { UserStatus as UserStatusType } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { InputBox, Margins, Box } from '@rocket.chat/fuselage';
import { Field, FieldGroup, FieldLabel, FieldRow, FieldError, FieldHint, TextInput, Select } from '@rocket.chat/fuselage-forms';
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useSetting, useEndpoint, useUser, useTranslation } from '@rocket.chat/ui-contexts';
import type { ChangeEvent, ComponentProps } from 'react';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import UserStatusMenu from '../../../components/UserStatusMenu';
import { USER_STATUS_TEXT_MAX_LENGTH } from '../../../lib/constants';
import { getUserStatusInitialValues } from '../../../lib/getUserInitialStatus';
import { STATUS_DURATION_OPTIONS, validateStatusExpiration } from '../../../lib/statusDurations';

export type EditStatusModalProps = {
	onClose: () => void;
};

type StatusFormValues = {
	statusText: string;
	statusType: UserStatusType;
	statusDuration: string;
	statusCustomDate: string;
	statusCustomTime: string;
};

const EditStatusModal = ({ onClose }: EditStatusModalProps) => {
    /* Implementation Hidden */
};

export default EditStatusModal;

```