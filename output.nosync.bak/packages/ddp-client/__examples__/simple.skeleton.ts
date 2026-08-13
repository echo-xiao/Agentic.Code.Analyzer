## File: packages/ddp-client/__examples__/simple.ts

```typescript
import WebSocket from 'ws';

import { DDPSDK } from '../src/DDPSDK';

(global as any).WebSocket = global.WebSocket || WebSocket;

const run = async (url: string, token: string) => {
    /* Implementation Hidden */
};

void (async () => {
	await run('wss://unstable.rocket.chat/websocket', process.env.INSTANCE_TOKEN || '');
})();

```