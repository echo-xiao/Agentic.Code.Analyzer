## File: apps/meteor/client/views/omnichannel/cannedResponses/modals/CannedResponseEdit.tsx

```typescript
import type { ILivechatDepartment, IOmnichannelCannedResponse, Serialized } from '@rocket.chat/core-typings';
import { Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint, useTranslation, useRouter } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useId, memo, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import CannedResponseForm from '../components/CannedResponseForm';

export type CannedResponseEditFormData = {
	_id: string;
	shortcut: string;
	text: string;
	tags: string[];
	scope: string;
	departmentId: string;
};

export type CannedResponseEditProps = {
	cannedResponseData?: Serialized<IOmnichannelCannedResponse>;
	departmentData?: Serialized<ILivechatDepartment>;
	onDelete?: () => void;
};

const getInitialData = (cannedResponseData: Serialized<IOmnichannelCannedResponse> | undefined) => ({
	_id: cannedResponseData?._id || '',
	shortcut: cannedResponseData?.shortcut || '',
	text: cannedResponseData?.text || '',
	tags: cannedResponseData?.tags || [],
	scope: cannedResponseData?.scope || 'user',
	departmentId: cannedResponseData?.departmentId || '',
});

const CannedResponseEdit = ({ cannedResponseData, onDelete }: CannedResponseEditProps) => {
    /* Implementation Hidden */
};

export default memo(CannedResponseEdit);

```