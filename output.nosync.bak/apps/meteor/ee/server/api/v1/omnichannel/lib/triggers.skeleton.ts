## File: apps/meteor/ee/server/api/v1/omnichannel/lib/triggers.ts

```typescript
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

export async function callTriggerExternalService({
	url,
	timeout,
	fallbackMessage,
	body,
	headers,
}: {
	url: string;
	timeout: number;
	fallbackMessage: string;
	body: Record<string, any>;
	headers: Record<string, string>;
}) {
    /* Implementation Hidden */
}

```