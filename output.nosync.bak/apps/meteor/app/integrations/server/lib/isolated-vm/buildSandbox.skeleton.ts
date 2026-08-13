## File: apps/meteor/app/integrations/server/lib/isolated-vm/buildSandbox.ts

```typescript
import { EventEmitter } from 'node:events';

import { serverFetch as fetch, Response } from '@rocket.chat/server-fetch';
import ivm, { type Context } from 'isolated-vm';

import * as s from '../../../../../lib/utils/stringUtils';

const proxyObject = (obj: Record<string, any>, forbiddenKeys: string[] = []): Record<string, any> => {
    /* Implementation Hidden */
};

const copyObject = (obj: Record<string, any> | any[]): Record<string, any> | any[] => {
    /* Implementation Hidden */
};

// Transferable data can be passed to isolates directly
const isTransferable = (data: any): data is ivm.Transferable => {
    /* Implementation Hidden */
};

// Semi-transferable data can be copied with an ivm.ExternalCopy without needing any manipulation.
const isSemiTransferable = (data: any) => data instanceof ArrayBuffer;

const copyData = <T extends ivm.Transferable | Record<string, any> | any[]>(data: T) => (isTransferable(data) ? data : copyObject(data));
const makeTransferable = (data: any) => (isTransferable(data) ? data : new ivm.ExternalCopy(copyObject(data)).copyInto());

export const buildSandbox = (context: Context) => {
    /* Implementation Hidden */
};

```