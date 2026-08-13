## File: apps/meteor/client/views/omnichannel/agents/AgentEdit.tsx

```typescript
import type { ILivechatAgent, ILivechatAgentStatus, ILivechatDepartmentAgents } from '@rocket.chat/core-typings';
import { Field, FieldLabel, FieldGroup, FieldRow, TextInput, Button, Box, Icon, Select, ButtonGroup } from '@rocket.chat/fuselage';
import type { SelectOption } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarHeader,
	ContextualbarScrollableContent,
	ContextualbarFooter,
} from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useTranslation, useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useId, useMemo } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';

import { getUserEmailAddress } from '../../../../lib/getUserEmailAddress';
import { UserInfoAvatar } from '../../../components/UserInfo';
import { omnichannelQueryKeys } from '../../../lib/queryKeys';
import { MaxChatsPerAgent } from '../additionalForms';
import AutoCompleteDepartmentMultiple from '../components/AutoCompleteDepartmentMultiple';

type AgentEditFormData = {
	name: string | undefined;
	username: string | undefined;
	email: string | undefined;
	departments: { label: string; value: string }[];
	status: ILivechatAgentStatus;
	maxNumberSimultaneousChat: number;
};

export type AgentEditProps = {
	agentData: Pick<ILivechatAgent, '_id' | 'username' | 'name' | 'status' | 'statusLivechat' | 'emails' | 'livechat'>;
	agentDepartments: (Pick<ILivechatDepartmentAgents, 'departmentId'> & { departmentName: string })[];
};

const AgentEdit = ({ agentData, agentDepartments }: AgentEditProps) => {
    /* Implementation Hidden */
};

export default AgentEdit;

```