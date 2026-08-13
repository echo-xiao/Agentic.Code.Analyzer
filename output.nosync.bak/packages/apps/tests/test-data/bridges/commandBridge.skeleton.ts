## File: packages/apps/tests/test-data/bridges/commandBridge.ts

```typescript
import type { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import type { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

import { CommandBridge } from '../../../src/server/bridges';
import { TestData } from '../utilities';

export class TestsCommandBridge extends CommandBridge {
	public commands: Map<string, (context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence) => void>;

	constructor() {
        /* Implementation Hidden */
    }

	public async doesCommandExist(command: string, appId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async enableCommand(command: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async disableCommand(command: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async modifyCommand(command: ISlashCommand, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public restoreCommand(comand: string, appId: string): void {
        /* Implementation Hidden */
    }

	public async registerCommand(command: ISlashCommand, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async unregisterCommand(command: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```