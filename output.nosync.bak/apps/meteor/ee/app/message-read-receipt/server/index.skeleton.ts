## File: apps/meteor/ee/app/message-read-receipt/server/index.ts

```typescript
import { License } from '@rocket.chat/license';

await License.onLicense('message-read-receipt', async () => {
	await import('./hooks');
});

```