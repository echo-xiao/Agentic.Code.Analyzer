## File: apps/meteor/client/lib/notificationManager.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

class NotificationPermissionEmitter extends Emitter {
	allowed: boolean;
}
export const notificationManager = new NotificationPermissionEmitter();

```