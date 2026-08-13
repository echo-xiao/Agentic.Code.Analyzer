## File: packages/apps-engine/src/definition/slashcommands/SlashCommandContext.ts

```typescript
import type { IRoom } from '../rooms';
import type { IUser } from '../users';

/**
 * Represents  the slash command's context when a user
 * executes a slash command.
 */
export class SlashCommandContext {
	constructor(
		private sender: IUser,
		private room: IRoom,
		private params: Array<string>,
		private threadId?: string,
		private triggerId?: string,
	) {
        /* Implementation Hidden */
    }

	/** The user who sent the command. */
	public getSender(): IUser {
        /* Implementation Hidden */
    }

	/** The room where the command was sent in. */
	public getRoom(): IRoom {
        /* Implementation Hidden */
    }

	/** The arguments passed into the command. */
	public getArguments(): Array<string> {
        /* Implementation Hidden */
    }

	public getThreadId(): string | undefined {
        /* Implementation Hidden */
    }

	public getTriggerId(): string | undefined {
        /* Implementation Hidden */
    }
}

```