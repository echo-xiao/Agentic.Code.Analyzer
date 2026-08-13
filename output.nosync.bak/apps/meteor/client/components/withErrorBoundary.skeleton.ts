## File: apps/meteor/client/components/withErrorBoundary.tsx

```typescript
import type { ComponentType, ReactNode, ComponentProps } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function withErrorBoundary<T extends object>(Component: ComponentType<T>, fallback: ReactNode = null) {
    /* Implementation Hidden */
}

export { withErrorBoundary };

```