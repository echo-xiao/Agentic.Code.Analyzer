## File: apps/meteor/app/mail-messages/server/lib/Mailer.ts

```typescript
import { sendMail } from '../functions/sendMail';
import { unsubscribe } from '../functions/unsubscribe';

export const Mailer = {
	sendMail,
	unsubscribe,
};

```