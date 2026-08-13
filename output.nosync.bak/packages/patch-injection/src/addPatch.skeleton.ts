## File: packages/patch-injection/src/addPatch.ts

```typescript
import type { BaseFunction, PatchData, PatchFunction } from './definition';
import { getFunctionPatches } from './getFunctionPatches';

export const addPatch = <T extends BaseFunction>(baseFunction: T, patch: PatchFunction<T>, condition?: () => boolean) => {
    /* Implementation Hidden */
};

```