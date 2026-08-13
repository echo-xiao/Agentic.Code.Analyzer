## File: packages/apps/base-runtime/src/handlers/listener/handler.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';
import { AppsEngineException } from '@rocket.chat/apps-engine/definition/exceptions/AppsEngineException';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages/IMessage';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms/IRoom';
import type { Defined } from 'jsonrpc-lite';
import { JsonRpcError } from 'jsonrpc-lite';

import { AppObjectRegistry } from '../../AppObjectRegistry';
import { MessageBuilder } from '../../lib/accessors/builders/MessageBuilder';
import { RoomBuilder } from '../../lib/accessors/builders/RoomBuilder';
import { MessageExtender } from '../../lib/accessors/extenders/MessageExtender';
import { RoomExtender } from '../../lib/accessors/extenders/RoomExtender';
import type { AppAccessors } from '../../lib/accessors/mod';
import { AppAccessorsInstance } from '../../lib/accessors/mod';
import type { RequestContext } from '../../lib/requestContext';
import { Room } from '../../lib/room';
import createRoom from '../../lib/roomFactory';
import { wrapAppForRequest } from '../../lib/wrapAppForRequest';

export default async function handleListener(request: RequestContext): Promise<Defined | JsonRpcError> {
    /* Implementation Hidden */
}

export function parseArgs(deps: { AppAccessorsInstance: AppAccessors }, evtMethod: string, params: unknown[]): unknown[] {
    /* Implementation Hidden */
}

/**
 * Hydrate the context object with the correct IMessage
 *
 * Some information is lost upon serializing the data from listeners through the pipes,
 * so here we hydrate the complete object as necessary
 */
function hydrateMessageObjects(context: unknown): unknown {
    /* Implementation Hidden */
}

function objectIsRawMessage(value: unknown): value is IMessage {
    /* Implementation Hidden */
}

```