## File: packages/core-services/src/lib/asyncLocalStorage.ts

```typescript
import { AsyncContextStore } from './ContextStore';
import type { IServiceContext } from '../types/ServiceClass';

export const asyncLocalStorage = new AsyncContextStore<IServiceContext>();

```