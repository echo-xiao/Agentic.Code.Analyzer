## File: apps/meteor/server/routes/avatar/middlewares/browserVersion.ts

```typescript
import type { IncomingMessage, ServerResponse } from 'node:http';

import type { IIncomingMessage } from '@rocket.chat/core-typings';
import type { NextFunction } from 'connect';
import { Cookies } from 'meteor/ostrio:cookies';
import parser from 'ua-parser-js';

import { getURL } from '../../../../app/utils/server/getURL';

const cookies = new Cookies();

export const isIEOlderThan11 = (userAgent: ReturnType<typeof parser>) => {
    /* Implementation Hidden */
};

export const handleBrowserVersionCheck = (request: IncomingMessage, res: ServerResponse, next: NextFunction) => {
    /* Implementation Hidden */
};

```