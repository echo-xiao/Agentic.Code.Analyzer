## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/RepliesForm/components/AgentField.tsx

```typescript
import type { ILivechatDepartmentAgents, Serialized } from '@rocket.chat/core-typings';
import { Field, FieldError, FieldHint, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useId } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AutoCompleteAgent from '../../../../AutoCompleteDepartmentAgent';
import { cxp } from '../../../utils/cx';
import type { RepliesFormData } from '../RepliesForm';

type AgentFieldProps = ComponentProps<typeof Field> & {
	control: Control<RepliesFormData>;
	agents: Serialized<ILivechatDepartmentAgents>[];
	canAssignAgent?: boolean;
	disabled?: boolean;
	isLoading?: boolean;
};

const AgentField = ({ control, agents, canAssignAgent, disabled = false, isLoading = false, ...props }: AgentFieldProps) => {
    /* Implementation Hidden */
};

export default AgentField;

```