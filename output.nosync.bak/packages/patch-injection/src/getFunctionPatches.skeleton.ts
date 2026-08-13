## File: packages/patch-injection/src/getFunctionPatches.ts

```typescript
import { calledFunctions, functions } from './data';
import type { BaseFunction, PatchData } from './definition';

export const getFunctionPatches = <T extends BaseFunction>(baseFunction: T): Set<PatchData<T>> => {
    /* Implementation Hidden */
};

```