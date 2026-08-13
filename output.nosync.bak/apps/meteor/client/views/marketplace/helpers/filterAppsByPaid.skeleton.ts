## File: apps/meteor/client/views/marketplace/helpers/filterAppsByPaid.ts

```typescript
import type { App } from '../types';

export const filterAppsByPaid = ({ purchaseType, price }: Partial<App>): boolean => purchaseType === 'subscription' || Boolean(price);

```