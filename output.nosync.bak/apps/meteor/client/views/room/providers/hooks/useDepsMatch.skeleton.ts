## File: apps/meteor/client/views/room/providers/hooks/useDepsMatch.ts

```typescript
import { useRef } from 'react';

const depsMatch = (a: unknown[], b: unknown[]): boolean => a.every((value, index) => Object.is(value, b[index]));

export const useDepsMatch = (deps: unknown[]): boolean => {
    /* Implementation Hidden */
};

```