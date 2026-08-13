## File: packages/patch-injection/src/makeFunction.ts

```typescript
import type { BaseFunction, PatchFunction, PatchedFunction } from './definition';
import { withMiddleware } from './midleware';

export const makeFunction = <T extends BaseFunction>(fn: T): PatchedFunction<T> => {
    /* Implementation Hidden */
};

```