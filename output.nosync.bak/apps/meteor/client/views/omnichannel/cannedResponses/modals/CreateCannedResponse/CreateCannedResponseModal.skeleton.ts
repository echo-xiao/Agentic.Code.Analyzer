## File: apps/meteor/client/views/omnichannel/cannedResponses/modals/CreateCannedResponse/CreateCannedResponseModal.tsx

```typescript
import type { IOmnichannelCannedResponse } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { memo, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import GenericError from '../../../../../components/GenericError';
import CannedResponseForm from '../../components/CannedResponseForm';
import type { CannedResponseEditFormData } from '../CannedResponseEdit';

const getInitialData = (cannedResponseData: IOmnichannelCannedResponse | undefined) => ({
	_id: cannedResponseData?._id || '',
	shortcut: cannedResponseData?.shortcut || '',
	text: cannedResponseData?.text || '',
	tags: cannedResponseData?.tags || [],
	scope: cannedResponseData?.scope || 'user',
	departmentId: cannedResponseData?.departmentId || '',
});

export type CreateCannedResponseModalProps = {
	cannedResponseData?: IOmnichannelCannedResponse;
	onClose: () => void;
	reloadCannedList: () => void;
};

const CreateCannedResponseModal = ({ cannedResponseData, onClose, reloadCannedList }: CreateCannedResponseModalProps) => {
    /* Implementation Hidden */
};

export default memo(CreateCannedResponseModal);

```