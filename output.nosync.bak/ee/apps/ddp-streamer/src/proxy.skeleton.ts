## File: ee/apps/ddp-streamer/src/proxy.ts

```typescript
import type { IncomingMessage, RequestOptions, ServerResponse } from 'http';
import http from 'http';
import url from 'url';

import type polka from 'polka';

const isProdEnv = process.env.NODE_ENV === 'production';

const skipProxyPaths = [/^\/sockjs\/info\?cb=/, /^\/health/];

export function proxy(): (req: IncomingMessage, res: ServerResponse, next: polka.Next) => void {
    /* Implementation Hidden */
}

```