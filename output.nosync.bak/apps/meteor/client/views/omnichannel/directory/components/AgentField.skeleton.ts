## File: apps/meteor/client/views/omnichannel/directory/components/AgentField.tsx

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { FormSkeleton } from './FormSkeleton';
import { UserStatus } from '../../../../components/UserStatus';
import AgentInfoDetails from '../../components/AgentInfoDetails';
import Field from '../../components/Field';
import Info from '../../components/Info';
import Label from '../../components/Label';

type AgentFieldProps = {
	agent: IOmnichannelRoom['servedBy'];
	isSmall?: boolean;
};

const AgentField = ({ agent, isSmall = false }: AgentFieldProps) => {
    /* Implementation Hidden */
};

export default AgentField;

```