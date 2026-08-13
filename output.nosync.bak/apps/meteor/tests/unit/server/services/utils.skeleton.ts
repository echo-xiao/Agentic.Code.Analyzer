## File: apps/meteor/tests/unit/server/services/utils.ts

```typescript
import sinon from 'sinon';

export async function testPrivateMethod<T extends (...args: any[]) => any>(
	service: any,
	methodName: string,
	testFn: (method: T) => Promise<void> | void,
): Promise<void> {
    /* Implementation Hidden */
}

export function createFreshServiceInstance<T>(moduleExports: any, serviceName?: string): T {
    /* Implementation Hidden */
}

```