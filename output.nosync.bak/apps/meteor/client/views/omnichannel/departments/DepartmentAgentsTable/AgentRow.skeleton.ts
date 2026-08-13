## File: apps/meteor/client/views/omnichannel/departments/DepartmentAgentsTable/AgentRow.tsx

```typescript
import { NumberInput } from '@rocket.chat/fuselage';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import { memo } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { EditDepartmentFormData, IDepartmentAgent } from '../definitions';
import AgentAvatar from './AgentAvatar';
import RemoveAgentButton from './RemoveAgentButton';

type AgentRowProps = {
	agent: IDepartmentAgent;
	index: number;
	register: UseFormRegister<EditDepartmentFormData>;
	onRemove: (agentId: string) => void;
};

const AgentRow = ({ index, agent, register, onRemove }: AgentRowProps) => {
    /* Implementation Hidden */
};
export default memo(AgentRow);

```