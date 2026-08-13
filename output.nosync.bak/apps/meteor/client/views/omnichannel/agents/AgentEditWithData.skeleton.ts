## File: apps/meteor/client/views/omnichannel/agents/AgentEditWithData.tsx

```typescript
import type { ILivechatAgent } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { ContextualbarSkeletonBody } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import AgentEdit from './AgentEdit';
import { omnichannelQueryKeys } from '../../../lib/queryKeys';

export type AgentEditWithDataProps = { uid: ILivechatAgent['_id'] };

const AgentEditWithData = ({ uid }: AgentEditWithDataProps) => {
    /* Implementation Hidden */
};

export default AgentEditWithData;

```