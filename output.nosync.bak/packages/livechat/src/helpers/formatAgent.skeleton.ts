## File: packages/livechat/src/helpers/formatAgent.ts

```typescript
import { getAvatarUrl } from './baseUrl';

type AgentType = {
	_id: string;
	name: string;
	status: string;
	emails: [{ address: string }];
	username: string;
	phone: [{ phoneNumber: string }];
	customFields: { phone: string };
};

export const formatAgent = (agent: AgentType) => {
    /* Implementation Hidden */
};

```