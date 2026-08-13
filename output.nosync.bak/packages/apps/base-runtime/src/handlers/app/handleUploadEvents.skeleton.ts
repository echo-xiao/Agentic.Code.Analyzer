## File: packages/apps/base-runtime/src/handlers/app/handleUploadEvents.ts

```typescript
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';

import type { App } from '@rocket.chat/apps-engine/definition/App';
import { AppsEngineException } from '@rocket.chat/apps-engine/definition/exceptions/AppsEngineException';
import type { IFileUploadContext } from '@rocket.chat/apps-engine/definition/uploads/IFileUploadContext';
import type { IUploadDetails } from '@rocket.chat/apps-engine/definition/uploads/IUploadDetails';
import type { Defined } from 'jsonrpc-lite';
import { JsonRpcError } from 'jsonrpc-lite';

import { AppObjectRegistry } from '../../AppObjectRegistry';
import { AppAccessorsInstance } from '../../lib/accessors/mod';
import type { RequestContext } from '../../lib/requestContext';
import { wrapAppForRequest } from '../../lib/wrapAppForRequest';
import { assertAppAvailable, assertHandlerFunction, isPlainObject } from '../lib/assertions';

export const uploadEvents = ['executePreFileUpload'] as const;

function assertIsUpload(v: unknown): asserts v is IUploadDetails {
    /* Implementation Hidden */
}

function assertString(v: unknown): asserts v is string {
    /* Implementation Hidden */
}

export default async function handleUploadEvents(request: RequestContext): Promise<Defined | JsonRpcError> {
    /* Implementation Hidden */
}

```