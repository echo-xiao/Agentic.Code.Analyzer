## File: apps/meteor/server/routes/i18n.ts

```typescript
import type { ServerResponse } from 'node:http';

import type { IncomingMessage } from 'connect';
import { WebApp } from 'meteor/webapp';
import { match } from 'path-to-regexp';

const matchRoute = match<{ lng: string }>('/:lng.json', { decode: decodeURIComponent });

const i18nHandler = async function (req: IncomingMessage, res: ServerResponse) {
    /* Implementation Hidden */
};

WebApp.connectHandlers.use('/i18n/', i18nHandler);

```