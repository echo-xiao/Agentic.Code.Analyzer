## File: packages/apps/base-runtime/src/handlers/slashcommand-handler.ts

```typescript
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms/IRoom';
import type { ISlashCommand } from '@rocket.chat/apps-engine/definition/slashcommands/ISlashCommand';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands/SlashCommandContext';
import type { Defined } from 'jsonrpc-lite';
import { JsonRpcError } from 'jsonrpc-lite';

import { AppObjectRegistry } from '../AppObjectRegistry';
import type { AppAccessors } from '../lib/accessors/mod';
import { AppAccessorsInstance } from '../lib/accessors/mod';
import type { RequestContext } from '../lib/requestContext';
import createRoom from '../lib/roomFactory';
import { wrapComposedApp } from '../lib/wrapAppForRequest';

export default async function slashCommandHandler(request: RequestContext): Promise<JsonRpcError | Defined> {
    /* Implementation Hidden */
}

type Deps = {
	AppAccessorsInstance: AppAccessors;
	request: RequestContext;
};

/**
 * @param deps Dependencies that need to be injected into the slashcommand
 * @param command The slashcommand that is being executed
 * @param method The method that is being executed
 * @param params The parameters that are being passed to the method
 */
export function handleExecutor(deps: Deps, command: ISlashCommand, method: 'executor' | 'previewer', params: unknown) {
    /* Implementation Hidden */
}

/**
 * @param deps Dependencies that need to be injected into the slashcommand
 * @param command The slashcommand that is being executed
 * @param params The parameters that are being passed to the method
 */
export function handlePreviewItem(deps: Deps, command: ISlashCommand, params: unknown) {
    /* Implementation Hidden */
}

```