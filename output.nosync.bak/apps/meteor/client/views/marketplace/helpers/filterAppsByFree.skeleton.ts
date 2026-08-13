## File: apps/meteor/client/views/marketplace/helpers/filterAppsByFree.ts

```typescript
import type { App } from '../types';

export const filterAppsByFree = ({ purchaseType, price, isEnterpriseOnly }: Partial<App>): boolean =>
	purchaseType === 'buy' && !price && !isEnterpriseOnly;

```