## File: apps/meteor/client/views/omnichannel/hooks/useAgentsList.ts

```typescript
import type { ILivechatAgent, Serialized } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

type AgentsListOptions = {
	filter: string;
	haveAll?: boolean;
	haveNoAgentsSelectedOption?: boolean;
	excludeId?: string;
	showIdleAgents?: boolean;
	onlyAvailable?: boolean;
	limit?: number;
};

type AgentOption = {
	_id: string;
	value: string;
	label: string;
};

const DEFAULT_QUERY_LIMIT = 25;

export const useAgentsList = (options: AgentsListOptions) => {
    /* Implementation Hidden */
};

```