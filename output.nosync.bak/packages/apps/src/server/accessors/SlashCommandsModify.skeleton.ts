## File: packages/apps/src/server/accessors/SlashCommandsModify.ts

```typescript
import type { ISlashCommandsModify } from '@rocket.chat/apps-engine/definition/accessors';
import type { ISlashCommand } from '@rocket.chat/apps-engine/definition/slashcommands';

import type { AppSlashCommandManager } from '../managers';

export class SlashCommandsModify implements ISlashCommandsModify {
	constructor(
		private readonly manager: AppSlashCommandManager,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public modifySlashCommand(slashCommand: ISlashCommand): Promise<void> {
        /* Implementation Hidden */
    }

	public disableSlashCommand(command: string): Promise<void> {
        /* Implementation Hidden */
    }

	public enableSlashCommand(command: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```