## File: apps/meteor/client/views/omnichannel/departments/DepartmentAgentsTable/AddAgent.tsx

```typescript
import { Box, Button } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { AriaAttributes } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEndpointMutation } from '../../../../hooks/useEndpointMutation';
import AutoCompleteAgent from '../../components/AutoCompleteAgent';
import type { IDepartmentAgent } from '../definitions';

type AddAgentProps = Pick<AriaAttributes, 'aria-labelledby'> & {
	agentList: IDepartmentAgent[];
	onAdd: (agent: IDepartmentAgent) => void;
};

function AddAgent({ agentList, onAdd, 'aria-labelledby': ariaLabelledBy }: AddAgentProps) {
    /* Implementation Hidden */
}

export default AddAgent;

```