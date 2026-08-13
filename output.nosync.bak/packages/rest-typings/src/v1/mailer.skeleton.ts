## File: packages/rest-typings/src/v1/mailer.ts

```typescript
import type { MailerProps } from './mailer/MailerParamsPOST';
import type { MailerUnsubscribeProps } from './mailer/MailerUnsubscribeParamsPOST';

export type MailerEndpoints = {
	'/v1/mailer': {
		POST: (params: MailerProps) => void;
	};

	'/v1/mailer.unsubscribe': {
		POST: (params: MailerUnsubscribeProps) => void;
	};
};

```