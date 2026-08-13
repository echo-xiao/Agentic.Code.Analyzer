## File: apps/meteor/app/lib/server/methods/createToken.ts

```typescript
import { MeteorError, User } from '@rocket.chat/core-services';
import { Accounts } from 'meteor/accounts-base';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		createToken(userId: string): { userId: string; authToken: string };
	}
}

const { CREATE_TOKENS_FOR_USERS_SECRET } = process.env;

export async function generateAccessToken(userId: string, secret: string) {
    /* Implementation Hidden */
}

```