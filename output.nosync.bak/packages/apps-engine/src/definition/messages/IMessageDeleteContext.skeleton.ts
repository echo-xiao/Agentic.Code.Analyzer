## File: packages/apps-engine/src/definition/messages/IMessageDeleteContext.ts

```typescript
import type { IMessage } from '.';
import type { IUser } from '../users';

/**
 * The context of execution for the following events:
 * - IPostMessageDeleted
 */
export interface IMessageDeleteContext {
	/**
	 * The message that was deleted
	 */
	message: IMessage;
	/**
	 * The user who deleted the message
	 */
	user: IUser;
}

```