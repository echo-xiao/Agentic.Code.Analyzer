## File: apps/meteor/app/livechat/server/lib/outboundcommunication.ts

```typescript
import type { IOutboundMessageProviderService } from '@rocket.chat/core-typings';
import { makeFunction } from '@rocket.chat/patch-injection';

export const getOutboundService = makeFunction((): IOutboundMessageProviderService => {
	throw new Error('error-no-license');
});

```