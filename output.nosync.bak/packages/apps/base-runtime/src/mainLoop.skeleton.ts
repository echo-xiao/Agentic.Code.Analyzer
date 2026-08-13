## File: packages/apps/base-runtime/src/mainLoop.ts

```typescript
import process from 'node:process';

import { JsonRpcError, type SuccessObject } from 'jsonrpc-lite';

import apiHandler from './handlers/api-handler';
import handleApp from './handlers/app/handler';
import outboundMessageHandler from './handlers/outboundcomms-handler';
import handleScheduler from './handlers/scheduler-handler';
import slashcommandHandler from './handlers/slashcommand-handler';
import videoConferenceHandler from './handlers/videoconference-handler';
import { decoder } from './lib/codec';
import { Logger } from './lib/logger';
import * as Messenger from './lib/messenger';
import { sendMetrics } from './lib/metricsCollector';
import type { RequestContext } from './lib/requestContext';

type Handlers = {
	app: typeof handleApp;
	api: typeof apiHandler;
	slashcommand: typeof slashcommandHandler;
	videoconference: typeof videoConferenceHandler;
	outboundCommunication: typeof outboundMessageHandler;
	scheduler: typeof handleScheduler;
	ping: (request: RequestContext) => Promise<'pong'>;
};

const COMMAND_PING = '_zPING';

async function requestRouter({ type, payload }: Messenger.JsonRpcRequest): Promise<void> {
    /* Implementation Hidden */
}

function handleResponse(response: Messenger.JsonRpcResponse): void {
    /* Implementation Hidden */
}

/**
 * The platform-agnostic message loop shared by every runtime.
 *
 * Adapters are expected to wire up their platform seams — transport, sandbox
 * `require`/globals, error listeners — during bootstrap and only then invoke
 * this loop. It reads messages from `process.stdin` (a `node:` API available on
 * every supported platform) and dispatches them to the shared handlers.
 */
export async function startMainLoop(): Promise<void> {
    /* Implementation Hidden */
}

```