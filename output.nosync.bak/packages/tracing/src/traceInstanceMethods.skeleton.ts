## File: packages/tracing/src/traceInstanceMethods.ts

```typescript
import { tracerActiveSpan } from '.';

const getArguments = (args: any[]): any[] => {
    /* Implementation Hidden */
};

export function traceInstanceMethods<T extends object>(instance: T, ignoreMethods: string[] = []): T {
    /* Implementation Hidden */
}

```