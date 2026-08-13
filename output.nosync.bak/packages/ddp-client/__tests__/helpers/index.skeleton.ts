## File: packages/ddp-client/__tests__/helpers/index.ts

```typescript
import type WS from 'jest-websocket-mock';

const acceptConnection = async (server: WS) => {
    /* Implementation Hidden */
};
export const handleConnection = async (server: WS, ...client: Promise<unknown>[]) => {
    /* Implementation Hidden */
};

export const handleConnectionAndRejects = async (server: WS, ...client: Promise<unknown>[]) => {
    /* Implementation Hidden */
};

const handleConnectionButNoResponse = async (server: WS, method: string, params: string[]) => {
    /* Implementation Hidden */
};

export const handleMethod = async (server: WS, method: string, params: any[], responseResult: string, ...client: Promise<unknown>[]) => {
    /* Implementation Hidden */
};

export const handleSubscription = async (server: WS, id: string, streamName: string, streamParams: string) => {
    /* Implementation Hidden */
};
export const fireStream = (action: 'changed' | 'removed' | 'added') => {
    /* Implementation Hidden */
};

export const fireStreamChange = fireStream('changed');
export const fireStreamRemove = fireStream('removed');
export const fireStreamAdded = fireStream('added');

```