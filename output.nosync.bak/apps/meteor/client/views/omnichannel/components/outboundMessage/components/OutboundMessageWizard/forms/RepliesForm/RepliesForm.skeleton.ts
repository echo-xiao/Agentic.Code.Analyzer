## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/RepliesForm/RepliesForm.tsx

```typescript
import type { Serialized, ILivechatDepartment, ILivechatDepartmentAgents } from '@rocket.chat/core-typings';
import { Box, Button, FieldGroup, Scrollable } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useToastBarDispatch } from '@rocket.chat/fuselage-toastbar';
import { useEndpoint, usePermission, useUser } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useEffect, useId, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AgentField from './components/AgentField';
import DepartmentField from './components/DepartmentField';
import { useAllowedAgents } from './hooks/useAllowedAgents';
import { omnichannelQueryKeys } from '../../../../../../../../lib/queryKeys';
import Form from '../../components/OutboundMessageForm';
import { FormFetchError } from '../../utils/errors';

export type RepliesFormData = {
	departmentId: string;
	agentId: string;
};

export type RepliesFormSubmitPayload = {
	departmentId?: string;
	department?: Serialized<ILivechatDepartment>;
	agentId?: string;
	agent?: Serialized<ILivechatDepartmentAgents>;
};

export type RepliesFormRef = {
	submit: () => Promise<RepliesFormSubmitPayload>;
};

type RepliesFormProps = {
	defaultValues?: Partial<RepliesFormData>;
	renderActions?(props: { isSubmitting: boolean }): ReactNode;
	onSubmit: (data: RepliesFormSubmitPayload) => void;
};

const RepliesForm = (props: RepliesFormProps) => {
    /* Implementation Hidden */
};

RepliesForm.displayName = 'RepliesForm';

export default RepliesForm;

```