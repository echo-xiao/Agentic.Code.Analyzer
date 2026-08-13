## File: apps/meteor/client/hooks/useFormatMemorySize.ts

```typescript
import { numberFormat } from '../../lib/utils/stringUtils';

const formatMemorySize = (memorySize: number): string | null => {
    /* Implementation Hidden */
};

export const useFormatMemorySize = (): ((memorySize: number) => string | null) => formatMemorySize;

```